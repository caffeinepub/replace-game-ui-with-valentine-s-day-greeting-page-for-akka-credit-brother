# Specification

## Summary
**Goal:** Make the existing jigsaw puzzle playable on desktop and touch devices, and update the puzzle’s rendered text to exactly “Love you akka 💖” (removing any “Sushma 💝” text).

**Planned changes:**
- Update the puzzle’s internal rendered text/content to exactly: “Love you akka 💖”, ensuring “Sushma” does not appear anywhere in puzzle/game rendered output.
- Fix puzzle input handling so pieces can be picked up, dragged, and dropped reliably on both mouse and touch (including preventing page scroll during drag in the puzzle area).
- Preserve the existing completion behavior and the existing post-puzzle Valentine message reveal without changing its text.

**User-visible outcome:** Users can complete the jigsaw puzzle end-to-end on desktop or mobile, and the puzzle displays “Love you akka 💖” with the same completion/reveal experience as before.
