import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../public/animations/alert.json';
import Text from '../src/components/foundation/Text';

export default function Sobre() {
  return (
    <div>
      <Player
        loop
        autoplay
        src={loadingAnimation}
        style={{ height: '300px', width: '300px' }}
      />
      <Text variant="" tag="h1" color="tertiary.light" textAlign="center">
        Erro 404
        <br />
        Essa página não existe
      </Text>
    </div>
  );
}
