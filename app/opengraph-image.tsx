import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tip Calculator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #ffffff, #f3f4f6)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1f2937',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Tip Calculator
          </h1>
          <p
            style={{
              fontSize: '36px',
              color: '#4b5563',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Fast and Easy Tip Calculations
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 