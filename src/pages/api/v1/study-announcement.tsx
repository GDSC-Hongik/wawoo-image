import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');
  if (!title) {
    return new Response('스터디 공지 제목을 입력해주세요.', { status: 400 });
  }

  const study = searchParams.get('study');
  if (!study) {
    return new Response('스터디 이름을 입력해주세요.', { status: 400 });
  }

  let displayDate;
  const dateParam = searchParams.get('date');
  if (dateParam) {
    try {
      const dateTime = new Date(dateParam);
      displayDate = dateTime.toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      displayDate = new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  } else {
    displayDate = new Date().toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const theme = searchParams.get('theme') || 'indigo';

  const themeColors = {
    indigo: {
      primary: '#6366f1',
      secondary: '#818cf8',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      accent: 'rgba(99, 102, 241, 0.2)',
      textAccent: '#a5b4fc',
    },
    rose: {
      primary: '#f43f5e',
      secondary: '#fb7185',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
      accent: 'rgba(244, 63, 94, 0.2)',
      textAccent: '#fda4af',
    },
    emerald: {
      primary: '#10b981',
      secondary: '#34d399',
      gradient: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
      accent: 'rgba(16, 185, 129, 0.2)',
      textAccent: '#6ee7b7',
    },
    amber: {
      primary: '#f59e0b',
      secondary: '#fbbf24',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      accent: 'rgba(245, 158, 11, 0.2)',
      textAccent: '#fcd34d',
    },
    react: {
      primary: '#61dafb',
      secondary: '#00d8ff',
      gradient:
        'linear-gradient(135deg, #61dafb 0%, #4299e1 50%, #3182ce 100%)',
      accent: 'rgba(97, 218, 251, 0.2)',
      textAccent: '#a5e9fa',
    },
    spring: {
      primary: '#6db33f',
      secondary: '#8bc34a',
      gradient:
        'linear-gradient(135deg, #6db33f 0%, #4caf50 50%, #2e7d32 100%)',
      accent: 'rgba(109, 179, 63, 0.2)',
      textAccent: '#a4d276',
    },
    ai: {
      primary: '#9333ea',
      secondary: '#a855f7',
      gradient:
        'linear-gradient(135deg, #9333ea 0%, #805ad5 50%, #6b46c1 100%)',
      accent: 'rgba(147, 51, 234, 0.2)',
      textAccent: '#c084fc',
    },
  };

  const colors =
    themeColors[theme as keyof typeof themeColors] || themeColors.indigo;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 박스 요소 */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background: `linear-gradient(135deg, ${colors.accent} 0%, rgba(168, 85, 247, 0.2) 100%)`,
            borderRadius: '100px',
            transform: 'rotate(15deg)',
          }}
        />

        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: '-30%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background: `linear-gradient(135deg, ${colors.accent} 0%, rgba(168, 85, 247, 0.1) 100%)`,
            borderRadius: '80px',
            transform: 'rotate(-20deg)',
          }}
        />

        {/* 메인 컨테이너 */}
        <div
          style={{
            display: 'flex',
            width: '94%',
            maxWidth: '1150px',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* 상단 바 */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: colors.accent,
                borderRadius: '22px',
                padding: '10px 20px',
                border: `1px solid ${colors.primary}40`,
              }}
            >
              <span style={{ fontSize: '30px' }}>📢</span>{' '}
              <div
                style={{
                  color: '#f8fafc',
                  fontSize: '30px',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                }}
              >
                새 스터디 공지가 올라왔어요!
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                padding: '10px 20px',
                borderRadius: '28px',
                color: '#cbd5e1',
                fontSize: '22px',
                fontWeight: '500',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ marginRight: '10px' }}
              >
                <path
                  d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.995 13.7H12.005M8.294 13.7H8.304M8.294 16.7H8.304"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {displayDate}
            </div>
          </div>

          {/* 메인 카드 */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(16px)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
              border: `1px solid ${colors.primary}30`,
            }}
          >
            {/* 왼쪽 컬러 섹션 */}
            <div
              style={{
                width: '18px',
                background: colors.gradient,
                boxShadow: `0 0 30px ${colors.primary}50`,
              }}
            />

            {/* 콘텐츠 영역 */}
            <div
              style={{
                display: 'flex',
                padding: '55px',
                width: '100%',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                {/* 공지 제목 */}
                <div
                  style={{
                    color: '#ffffff',
                    fontSize: '62px',
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    marginBottom: '22px',
                    lineHeight: '1.30',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    maxWidth: '80%',
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                  }}
                >
                  {title}
                </div>

                {/* 구분선 */}
                <div
                  style={{
                    width: '70px',
                    height: '5px',
                    background: colors.gradient,
                    marginBottom: '24px',
                    borderRadius: '4px',
                    boxShadow: `0 2px 6px ${colors.primary}40`,
                  }}
                />

                {/* 스터디 이름 */}
                <div
                  style={{
                    color: '#e2e8f0',
                    fontSize: '32px',
                    lineHeight: '1.3',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: '0.95',
                  }}
                >
                  {study}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
