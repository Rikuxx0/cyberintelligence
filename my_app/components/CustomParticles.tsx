'use client';

import React from 'react';
import { css } from '@emotion/css';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import type { Engine } from '@tsparticles/engine';
import ParticlesParams from '../asset/particles.json';

export const CustomParticles: React.FC = () => {
    const particlesInit = async (engine: Engine) =>{
        //tsparticlesの全機能を読み込む
        await loadFull(engine);
    };

    return (
        <Particles 
            id='tsparticles'
            className={styles.particles}
            init={particlesInit}
            options={ParticlesParams}
        />
    );
};

const styles = {
     particles: css`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1; 
  `,
};

