import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@mail.com" && password === "123456") {
      router.replace("/home");
    } else {
      Alert.alert("Oops! 😬", "Email atau password salah.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login untuk melanjutkan</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#BBBBBB"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#BBBBBB"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.btnText}>Masuk →</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>atau</Text>
            <View style={styles.dividerLine} />
          </View>

          <Link href="/register" asChild>
            <TouchableOpacity style={styles.btnRegister} activeOpacity={0.75}>
              <Text style={styles.btnRegisterText}>Belum punya akun? Daftar</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.footer}>© 2025 Super-App UNPRI</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  header: { alignItems: "center", marginBottom: 32 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 30, fontWeight: "900", color: "#111111", letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: "#888888", marginTop: 6 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  label: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: "#111111",
    fontSize: 15,
    marginBottom: 20,
  },
  btnLogin: {
    backgroundColor: "#111111",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
  },
  btnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  divider: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#EEEEEE" },
  dividerText: { color: "#AAAAAA", marginHorizontal: 12, fontSize: 13 },
  btnRegister: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
  },
  btnRegisterText: { color: "#111111", fontWeight: "700", fontSize: 14 },
  footer: { textAlign: "center", color: "#CCCCCC", marginTop: 32, fontSize: 12 },
});