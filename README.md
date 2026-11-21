# Spark ⚡

An Android app for learning electronics, PCBs and components — built for SMT/THT techs and assemblers.

- **Learn**: lessons grouped into modules, each ending in a quick check
- **Flashcards**: spaced repetition (cards you miss come back sooner)
- **Quiz**: question bank, plus "Review" mode that mixes in earlier topics
- **Games**: resistor colour codes, SMD codes, capacitor codes, Ohm's law, unit conversions, logic gates, series/parallel, defect spotter, polarity, speed round
- **Tools**: resistor/cap code calculators, Ohm's law, LED resistor, voltage divider
- XP, levels and a daily streak

The app is a WebView wrapper around the web app in `app/src/main/assets/`.
Every push to `main` builds a signed APK with GitHub Actions and publishes it under **Releases**.
