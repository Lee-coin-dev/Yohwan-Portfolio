/**
 * Synthesized violin-like tones via Web Audio API.
 * Requires a user gesture before first play (handled by click handlers).
 */
const ViolinAudio = (() => {
  let ctx = null;

  const NOTES = {
    a: 440.0,
    d: 293.66,
    g: 196.0,
  };

  function ensureContext() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  function playNote(stringKey, duration = 1.4) {
    const freq = NOTES[stringKey];
    if (!freq) return;

    const audio = ensureContext();
    const now = audio.currentTime;

    const master = audio.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.22, now + 0.08);
    master.gain.exponentialRampToValueAtTime(0.001, now + duration);
    master.connect(audio.destination);

    const osc = audio.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, now);

    const vibrato = audio.createOscillator();
    vibrato.type = "sine";
    vibrato.frequency.setValueAtTime(5.5, now);
    const vibratoGain = audio.createGain();
    vibratoGain.gain.setValueAtTime(3, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    const filter = audio.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(900, now + duration);
    filter.Q.setValueAtTime(2, now);

    osc.connect(filter);
    filter.connect(master);

    osc.start(now);
    vibrato.start(now);
    osc.stop(now + duration);
    vibrato.stop(now + duration);
  }

  return { playNote };
})();
