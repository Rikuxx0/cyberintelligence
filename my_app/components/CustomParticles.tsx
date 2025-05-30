import React from 'react';
import Particles from 'react-particles-js';
import { IOptions, RecursivePartial } from 'tsparticles';
import { css } from '@emotion/css';
// import ParticlesParams from '../assets/particles-default.json';

export const CustomParticles: React.FC = () => {
    return(
        <Particles 
            className={styles.particles}
            // params={ParticlesParams as RecursivePartial<IOptions>}
        />
    )
}

const styles = {
    particles: css`
        position: absolute;
        width: 100%;
        height: 100%;
    `
}