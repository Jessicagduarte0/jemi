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

// Tela de Cadastro com validação obrigatória de campos
const RegisterScreen = ({ navigation }) => {
  const { registerUser, loginUser } = useAppContext();

  // Estado dos campos do formulário
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Atualiza campo individual via desestruturação
  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Validação completa dos campos obrigatórios
  const validate = () => {
    const { name, email, password, phone } = form;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório.';
    } else if (name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres.';
    }

    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório.';
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Máscara de telefone
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const { name, email, password, phone } = form;

      // POST: cadastrar usuário via API (contexto)
      const { success } = await registerUser({ name, email, password, phone });

      if (success) {
        // Após cadastro, faz login automático
        await loginUser({ email, password });
        Alert.alert('Sucesso!', 'Conta criada com sucesso!', [
          { text: 'OK', onPress: () => navigation.replace('Main') },
        ]);
      } else {
        Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
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
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Criar Conta</Text>

        {/* Nome Completo */}
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Digite seu nome completo"
          placeholderTextColor={colors.textLight}
          value={form.name}
          onChangeText={(v) => updateField('name', v)}
          autoCapitalize="words"
        />
        {!!errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        {/* E-mail */}
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="seu@email.com"
          placeholderTextColor={colors.textLight}
          value={form.email}
          onChangeText={(v) => updateField('email', v)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Senha */}
        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Mínimo 6 caracteres"
          placeholderTextColor={colors.textLight}
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          secureTextEntry
        />
        {!!errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Telefone */}
        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="(00) 00000-0000"
          placeholderTextColor={colors.textLight}
          value={form.phone}
          onChangeText={(v) => updateField('phone', formatPhone(v))}
          keyboardType="phone-pad"
        />
        {!!errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={[styles.btnPrimary, loading && styles.btnDisabled]}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnPrimaryText}>Cadastrar</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: 28, paddingTop: 50, paddingBottom: 40 },
  backBtn: { marginBottom: 16 },
  backIcon: { fontSize: 24, color: colors.text },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, marginBottom: 24 },
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
  errorText: { color: colors.error, fontSize: 12, marginBottom: 12 },
  btnPrimary: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnDisabled: { opacity: 0.6 },
  btnPrimaryText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default RegisterScreen;
