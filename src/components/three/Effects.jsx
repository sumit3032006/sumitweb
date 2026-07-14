import { EffectComposer, Bloom, Vignette, DepthOfField, SMAA } from '@react-three/postprocessing'

/**
 * Post-processing stack: Bloom (neon glow), Depth of Field (cinematic focus),
 * Vignette and SMAA anti-aliasing.
 * DOF is skipped on low-power devices to protect the frame budget.
 */
export default function Effects({ enableDOF = true }) {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {enableDOF ? (
        <DepthOfField focusDistance={0.012} focalLength={0.04} bokehScale={4} height={480} />
      ) : (
        <></>
      )}
      <Bloom
        intensity={0.9}
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <Vignette eskil={false} offset={0.25} darkness={0.85} />
      <SMAA />
    </EffectComposer>
  )
}
