export default function LiquidBlobs() {
  return (
    <div aria-hidden="true">
      <div
        className="blob"
        style={{
          top: '-10%',
          left: '-5%',
          width: '480px',
          height: '480px',
          background:
            'radial-gradient(circle, rgba(56,189,248,0.55), rgba(14,165,233,0.2))',
          animation: 'blobFloat 18s ease-in-out infinite',
        }}
      />
      <div
        className="blob"
        style={{
          top: '30%',
          right: '-10%',
          width: '520px',
          height: '520px',
          background:
            'radial-gradient(circle, rgba(125,211,252,0.5), rgba(186,230,253,0.15))',
          animation: 'blobFloat 22s ease-in-out infinite reverse',
        }}
      />
      <div
        className="blob"
        style={{
          bottom: '-12%',
          left: '20%',
          width: '440px',
          height: '440px',
          background:
            'radial-gradient(circle, rgba(14,165,233,0.4), rgba(56,189,248,0.1))',
          animation: 'blobFloat 26s ease-in-out infinite',
        }}
      />
    </div>
  );
}
