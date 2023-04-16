# Technical Plan

## Overview

Two people standing before the display will be prompted to wave to the display. The display will then use their facial features to produce a unique work of art for the day's theme thanks to Stable Diffusion generated images.

Behind the scenes, the key technical pieces include:

1. Using opencv.js to detect poses
2. Using some hueristics to detect waves and emit events
3. Capturing a face from a pose when the event is detected
4. Using facial feature detection with opencv.js to find a vector of features from a face and see if we have seen someone with similar enough features in the past to believe to be the same person
    4.1. If first time, generate a random prime with crypto tools and store in DB
    4.2. If return, reuse stored prime number identifier
5. Multiply primes to generate unique pair identifier to serve as seed
7. Retrieve a theme of the day
8. Kick-off a request to stable diffusion API, powered by the automatic1111 API, to generate an image in the correct proportions at a smaller size (768x432)
9. Kick-off a subsequent request to stable diffusion API, to upscale the image (4k)
10. UI of screens and CSS animation transitions between states

## Key Pieces

* States of the Client:
    1. No one detected
        1.a. Art scene (rotation)
        1.b. Branding scene (between art)
    2. One pose detected
    3. Two or more poses detected
        3.a. One wave detected
        3.b. Two waves detected
    4. Generating New Art
        4.a. Previewing Art
        4.b. Final Art (displayed for 5s before transition to state 1/2/3)
    5. Return of same pair, retrieve art

* Components of Client - Hand-waving Overview:
    * Pose Event Emitter
        * For each frame, emits data we care about (poses, locations of poses, reference to image data)
    * Application Event Emitter
        * Layers above pose event emitter and filters / stream processes down to semantic events relevant to the application
    * View/Controller Component
        * Listens to Application Event Emitter
        * Handles state transition logic
        * Dispatches to art service
        * Surfaces info to view
        * View / CSS handles UI
    * Art Service
        * Given two image rectangles bounded by the detected poses, and the day's prompt, calls out to web API to either start generation of art and return a handle on progress meter or the completed prior generation (if same people)
        * Progress events emitted
        * Completion event emitted

* Components of Server
    * Face detection via opencv -> vector
    * Prime generation (via crypto library)
    * Lookup of previously detected facial vectors
    * Persistence of data (face vector/prime)
    * Delegation of requests to automatic1111 stable diffusion web UI
    * Update / completion endpoints

## Resources

TensorFlow Pose Detection: https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
PoseNet (Multipose Estimation): https://github.com/tensorflow/tfjs-models/tree/master/pose-detection/src/posenet