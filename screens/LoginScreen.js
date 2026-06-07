import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

// Tela de Login com validação de campos
const LoginScreen = ({ navigation }) => {
  const { loginUser } = useAppContext();

  // Estado dos campos
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Erros de validação
  const [errors, setErrors] = useState({});

  // Validação dos campos
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido.';
    }
    if (!password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter mínimo 6 caracteres.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      // Desestruturação do retorno da função de login (contexto)
      const { success, message } = await loginUser({ email, password });
      if (success) {
        navigation.replace('Main');
      } else {
        Alert.alert('Erro', message || 'Credenciais inválidas.');
      }
    } catch (e) {
      Alert.alert('Erro', 'Falha na conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <Text style={styles.brand}>JEMI</Text>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Entre com seu e-mail e sua senha</Text>

        {/* Campo E-mail */}
        <Text style={styles.label}>Digite seu email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          placeholderTextColor={colors.textLight}
          value={email}
          onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: '' })); }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Campo Senha */}
        <Text style={styles.label}>Digite sua senha</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Senha"
          placeholderTextColor={colors.textLight}
          value={password}
          onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: '' })); }}
          secureTextEntry
        />
        {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {/* Botão Entrar */}
        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnPrimaryText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>ou</Text>

        {/* Botão Google (simulado) */}
        <TouchableOpacity
          style={styles.btnGoogle}
          onPress={() => Alert.alert('Info', 'Login com Google não disponível nesta versão demo.')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnGoogleText}>🇬  Entrar com conta Google</Text>
        </TouchableOpacity>

        {/* Link para cadastro */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Ainda não tem conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Cadastrar-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 28, paddingTop: 60, paddingBottom: 40 },
  brand: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 32,
  },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: colors.textSecondary, marginBottom: 28 },
  label: { fontSize: 13, color: colors.textSecondary, marginBottom: 6, fontWeight: '500' },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.surface,
    marginBottom: 4,
  },
  inputError: { borderColor: colors.error },
  errorText: { color: colors.error, fontSize: 12, marginBottom: 8 },
  forgotBtn: { alignSelf: 'flex-end', marginVertical: 12 },
  forgotText: { color: colors.textSecondary, fontSize: 13 },
  btnPrimary: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  orText: { textAlign: 'center', color: colors.textLight, marginVertical: 16 },
  btnGoogle: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  btnGoogleText: { fontSize: 15, color: colors.text, fontWeight: '500' },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: { color: colors.textSecondary, fontSize: 14 },
  registerLink: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});

export default LoginScreen;
