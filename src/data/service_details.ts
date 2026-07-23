export interface CaseStudy {
  title: string;
  metric: string;
}

export interface ServiceDetail {
  slug: string;
  metaTitle: string;
  heroHeadline: string;
  content: string[];
  caseStudies: CaseStudy[];
  ctaText: string;
  heroImage: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "nanite-optimization",
    metaTitle: "Nanite Performance Optimization | Fix Frame Rate Collapse | BloodNexus",
    heroHeadline: "Fix Your Nanite Frame Rate Collapse in 18 Days",
    heroImage: "/cloudinary-assets/images/new-1_q5vqzv.png",
    content: [
      "Unreal Engine 5’s Nanite virtualized geometry system is revolutionary, but improperly authored dense meshes can rapidly bottleneck even high-end GPUs. When triangle clusters fail to cull correctly, or material complexity overwhelms the rasterizer, frame times spike and overall stability collapses. We diagnose these exact pipeline failures.",
      "Our optimization process begins with deep GPU profiling using RenderDoc and Unreal Insights to isolate rendering bottlenecks. We analyze cluster generation, evaluating how efficiently Nanite builds its internal hierarchies and identifying assets that defeat occlusion culling due to oversized bounds or intersecting geometry.",
      "A primary culprit in frame rate collapse is often material instructions. Nanite performs exceptionally well with opaque geometry, but excessive masking, World Position Offset (WPO) calculations, and complex pixel shaders force the engine to fall back to traditional rendering paths, instantly destroying performance.",
      "We aggressively audit your material instances, stripping out unnecessary instructions, merging duplicate textures, and converting complex procedural nodes into baked maps. Where WPO is strictly required for vertex animation, we implement strict distance-based culling to ensure it only calculates near the camera.",
      "Draw calls can also become an issue if the scene relies on thousands of non-Nanite actors interspersed with Nanite clusters. We restructure your levels utilizing Hierarchical Instanced Static Meshes (HISM) and merge scattered actors to keep CPU overhead minimal while feeding the GPU massive, continuous blocks of geometry.",
      "Beyond raw assets, we configure your project’s base scalable settings. Tuning the Nanite proxy mesh generation, adjusting the cluster error metrics, and tweaking virtual shadow maps ensures your project gracefully degrades on lower-end hardware without sacrificing the monolithic detail on current-gen consoles.",
      "The result is a structurally sound rendering pipeline. Frame times become rock solid, memory spikes are smoothed out, and the GPU remains fully fed without stalling. By addressing these architectural issues at the core, we guarantee a highly performant experience across your target platforms."
    ],
    caseStudies: [
      {
        title: "AAA Action Title",
        metric: "50 FPS → 60 FPS in 18 days"
      },
      {
        title: "Next-Gen Open World RPG",
        metric: "Frame variance reduced by 60%"
      }
    ],
    ctaText: "BOOK YOUR FREE NANITE AUDIT"
  },
  {
    slug: "animation-rigging",
    metaTitle: "Game Animation Rigging & Mocap Cleanup | BloodNexus Studio",
    heroHeadline: "Stop Losing 12 Weeks on Animation Rigging",
    heroImage: "/cloudinary-assets/images/3dart-10_ziywet.png",
    content: [
      "Rigging is often the quiet bottleneck of game development. A poorly constructed rig not only slows down your animation team but creates a massive technical debt when transitioning to engine. Complex weighting errors, gimbal lock, and inefficient bone hierarchies can entirely stall production.",
      "We specialize in rapid, highly technical skeletal mesh rigging. Our approach focuses on building modular, scalable rigs that are engine-ready from day one. We ensure perfect root bone alignment, streamlined hierarchies, and proper twist bone implementations to preserve volume during extreme deformations.",
      "Motion capture cleanup is a critical part of our pipeline. Raw mocap data is inherently noisy, plagued by foot sliding, jittering, and structural popping. We utilize advanced filtering algorithms and manual IK solving in Maya and MotionBuilder to smooth the data while preserving the actor's original cadence and emotional weight.",
      "Our IK/FK switching systems are built explicitly for gameplay mechanics. We design rigs that natively support Unreal Engine's Control Rig and Unity's Animation Rigging packages, allowing your technical animators to build procedural recoil, foot placement, and procedural aiming directly in-engine.",
      "For facial animation, we implement highly detailed FACS-based blendshape setups (Facial Action Coding System). This allows for nuanced emotional ranges and seamless integration with audio-driven lip-sync software or iPhone ARKit facial capture data, delivering AAA-quality cinematic performances.",
      "Physics and cloth simulation require extremely specific collision volume setups on the rig. We author custom proxy collision meshes attached to the skeleton to drive accurate, real-time cloth and hair dynamics in Unreal Engine’s Chaos physics solver, preventing clipping and maintaining stable collision at high framerates.",
      "By outsourcing your rigging and mocap cleanup, your animators can focus on performance rather than fighting bad data. We deliver clean, robust, and mathematically sound rigs that immediately drop into your project pipeline."
    ],
    caseStudies: [
      {
        title: "RPG Cinematic Project",
        metric: "10 Characters Rigged in 4 Weeks"
      }
    ],
    ctaText: "BOOK YOUR FREE ANIMATION AUDIT"
  },
  {
    slug: "platform-porting",
    metaTitle: "Game Platform Porting Expert | Mobile/Console Optimization | BloodNexus",
    heroHeadline: "Port Your Game to Mobile in 4 Weeks, Not 12",
    heroImage: "/web-apps/odyssey_travels.png",
    content: [
      "Porting a PC or Console title to Mobile hardware is not a simple translation—it requires a fundamental restructuring of memory management, rendering pipelines, and asset loading. The extreme thermal constraints and varied hardware profiles of iOS and Android devices demand aggressive optimization strategies.",
      "Memory is the primary killer in mobile porting. We begin by overhauling your texture streaming pools, compressing high-res assets using ASTC formats, and significantly lowering audio bitrates. We implement strict budget tracking to ensure the app never triggers the OS out-of-memory (OOM) killer.",
      "Rendering pipelines must be rewritten for mobile GPUs. We transition heavy deferred rendering setups into highly optimized Forward or Mobile Deferred paths. Complex volumetric lighting and dynamic shadows are often baked into lightmaps, completely offloading the GPU while maintaining visual fidelity.",
      "Shader complexity is heavily restricted on mobile hardware. We audit all materials, stripping out multi-pass operations, simplifying mathematical nodes, and aggressively reducing texture lookups. We build scalable material quality levels so the game runs smoothly on a 4-year-old Android phone while still looking beautiful on an iPhone 15 Pro.",
      "Level of Detail (LOD) systems are completely re-authored. Mobile devices cannot handle massive geometry counts, so we implement aggressive LOD culling, utilize hierarchical LODs (HLODs) to merge distant meshes into single draw calls, and tune cull distances specifically for smaller screen resolutions.",
      "CPU optimization focuses on minimizing garbage collection (GC) spikes in Unity or blueprint tick overhead in Unreal Engine. We refactor tight loops, pool frequently used objects like projectiles and enemies, and move heavy physics calculations into background threads.",
      "Through these intense restructuring processes, we shrink your game's footprint drastically while hitting strict 30 or 60 FPS targets. We handle the entire compliance pipeline, ensuring your title is optimized, compliant, and ready for global deployment on the App Store and Google Play."
    ],
    caseStudies: [
      {
        title: "Action Title Port",
        metric: "8GB → 2.5GB. PS5 Ready. 4 Weeks."
      }
    ],
    ctaText: "BOOK YOUR FREE PORTING AUDIT"
  },
  {
    slug: "vr-performance",
    metaTitle: "VR Performance Optimization | Fix Motion Sickness & Frame Drops | BloodNexus",
    heroHeadline: "Fix VR Motion Sickness in 3 Weeks",
    heroImage: "/vr/vr_hero_bg.png",
    content: [
      "In Virtual Reality, performance is not just a technical metric—it is a physiological requirement. Even momentary frame drops or high latency can induce severe motion sickness, completely ruining the user experience. A locked 72, 90, or 120 FPS is non-negotiable.",
      "The core of VR optimization is minimizing motion-to-photon latency. We utilize deep profiling tools like the Oculus OVR Metrics Tool and SteamVR Frame Timing to dissect your render thread and game thread. We identify exactly where the pipeline stalls and implement immediate structural fixes.",
      "Draw call reduction is paramount in VR, as the engine must render the scene twice (once per eye). We implement aggressive batching techniques, utilize instanced stereo rendering, and optimize occlusion culling volumes to ensure the CPU isn’t wasting cycles preparing invisible geometry for the GPU.",
      "We heavily optimize transparent materials and overdraw, which are notorious performance killers in VR. Particle systems, glass, and foliage are reworked to minimize alpha blending overlapping. We utilize custom shaders that approximate translucency without the massive rasterization cost.",
      "Physics calculations can cause severe game-thread hitching. We optimize collision bounds, reduce the frequency of physics stepping, and heavily pool physics actors to ensure smooth interactions without dropping frames when complex objects collide in the VR environment.",
      "Finally, we implement dynamic resolution scaling and foveated rendering techniques. By rendering the center of the player’s vision at high resolution and degrading the peripheral edges, we save massive amounts of GPU fill-rate, ensuring the headset maintains a perfectly stable frame time under heavy load."
    ],
    caseStudies: [
      {
        title: "Immersive VR Simulation",
        metric: "85 FPS Unstable → 90 FPS Locked"
      }
    ],
    ctaText: "BOOK YOUR FREE VR AUDIT"
  },
  {
    slug: "shader-optimization",
    metaTitle: "Custom Shader Optimization | Game Rendering Consulting | BloodNexus",
    heroHeadline: "Your GPU Is Bottlenecked. Let’s Fix It.",
    heroImage: "/cloudinary-assets/images/archviz-1_hsyoti.jpg",
    content: [
      "Shader complexity is often the silent killer of GPU performance. As technical artists push for greater visual fidelity, the number of instructions and texture samplers in a single material can easily spiral out of control, leading to massive fill-rate bottlenecks and thermal throttling.",
      "Our optimization pipeline starts with a complete audit of your shader instructions using tools like RenderDoc, PIX, and Unreal’s Shader Complexity view. We analyze exactly how many ALU (Arithmetic Logic Unit) instructions are executed per pixel and where texture bandwidth is being wasted.",
      "We replace expensive mathematical operations with cheaper approximations where visually acceptable. Pow(), Sin(), and complex noise functions are heavily optimized or replaced with pre-calculated lookup textures (LUTs). We consolidate multiple texture reads into packed channels (e.g., ORM maps for Occlusion, Roughness, Metallic) to drastically reduce memory bandwidth.",
      "Overdraw is a massive issue when complex shaders are applied to transparent or overlapping geometry. We optimize your alpha testing and alpha blending techniques, implementing early-Z culling strategies to ensure the GPU doesn’t waste time executing heavy shaders on pixels that will eventually be occluded.",
      "We specialize in converting heavy procedural node networks into highly optimized, compiled HLSL/GLSL code. By bypassing the engine’s visual node editor overhead and writing custom code blocks, we can often halve the instruction count of complex visual effects like water, holographic interfaces, and volumetric fog.",
      "The end result is a highly efficient rendering pipeline that looks identical to the original art direction, but executes in a fraction of the time. We free up precious milliseconds on your GPU, allowing you to push resolution, framerate, or add entirely new visual features without breaking your performance budget."
    ],
    caseStudies: [
      {
        title: "Next-Gen Rendering Pipeline",
        metric: "GPU Utilization +40%. Frame Time -8ms."
      }
    ],
    ctaText: "BOOK YOUR FREE RENDERING AUDIT"
  }
];
