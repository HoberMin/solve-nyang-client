import React, { useCallback, useEffect } from 'react';

interface ConfettiParticle {
  element: HTMLDivElement;
  animation: Animation;
}

const Confetti = () => {
  const createConfetti = useCallback(() => {
    const colors: string[] = [
      '#FFB3BA', // 파스텔 핑크
      '#BAFFC9', // 파스텔 그린
      '#BAE1FF', // 파스텔 블루
      '#FFE4BA', // 파스텔 오렌지
      '#E8BAFF', // 파스텔 퍼플
      '#FFFFBA', // 파스텔 옐로우
    ];
    const confettiCount = 150; // 입자 수 증가
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '50';
    document.body.appendChild(container);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];

      // 각도를 0-360도 사이에서 랜덤하게 설정
      const angle = Math.random() * 360 * (Math.PI / 180);
      // 거리를 0-400px 사이에서 랜덤하게 설정 (더 멀리 퍼지도록)
      const distance = Math.random() * 400;

      confetti.style.position = 'absolute';
      confetti.style.left = `${centerX}px`;
      confetti.style.top = `${centerY}px`;
      confetti.style.width = `${8 + Math.random() * 12}px`; // 8-20px 크기로 증가
      confetti.style.height = `${8 + Math.random() * 12}px`;
      confetti.style.backgroundColor = color;
      confetti.style.transform = `translate(-50%, -50%)`;
      confetti.style.borderRadius = '50%'; // 동그란 모양으로

      container.appendChild(confetti);

      // 종점 위치 계산
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      const animation = confetti.animate(
        [
          {
            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
            opacity: 0,
          },
          {
            transform: 'translate(-50%, -50%) scale(1) rotate(180deg)',
            opacity: 1,
            offset: 0.1,
          },
          {
            transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) scale(0) rotate(360deg)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000 + Math.random() * 500,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
      );

      animation.onfinish = () => confetti.remove();
    }

    setTimeout(() => container.remove(), 2000);
  }, []);

  useEffect(() => {
    createConfetti();
  }, [createConfetti]);

  return null;
};

export default Confetti;
