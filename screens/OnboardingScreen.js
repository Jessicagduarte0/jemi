import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  StatusBar,
} from 'react-native';
import colors from '../constants/colors';

const { width, height } = Dimensions.get('window');

// Dados dos slides do onboarding
const SLIDES = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    title: 'JEMI',
    subtitle: 'Moda para todos os estilos',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    title: 'JEMI',
    subtitle: 'Peças que unem conforto, qualidade e elegância.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
    title: 'JEMI',
    subtitle: 'Peças que unem conforto, qualidade e elegância.',
  },
];

// Tela de Onboarding com 3 slides e paginação
const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const goToNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  const skip = () => navigation.replace('Login');

  const onScroll = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const isLast = currentIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        scrollEventThrottle={16}
      >
        {SLIDES.map(({ id, image, title, subtitle }) => (
          <View key={id} style={styles.slide}>
            <Image source={{ uri: image }} style={styles.image} />
            {/* Gradiente simulado com overlay */}
            <View style={styles.overlay} />
            <View style={styles.content}>
              <Text style={styles.brand}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Controles */}
      <View style={styles.controls}>
        {/* Dots de paginação */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>

        {/* Botões */}
        <View style={styles.buttons}>
          {!isLast ? (
            <>
              <TouchableOpacity style={styles.btnOutline} onPress={skip}>
                <Text style={styles.btnOutlineText}>Pular</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnFilled} onPress={goToNext}>
                <Text style={styles.btnFilledText}>Próximo</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={[styles.btnFilled, { flex: 1 }]} onPress={skip}>
              <Text style={styles.btnFilledText}>Começar</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  slide: { width, height, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  content: {
    position: 'absolute',
    bottom: 180,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
  },
  brand: {
    fontSize: 40,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    backgroundColor: colors.white,
    width: 20,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  btnOutline: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnOutlineText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  btnFilled: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFilledText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
