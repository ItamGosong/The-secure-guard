import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Nama tidak boleh kosong.";
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!email.trim()) {
      newErrors.email = "Email tidak boleh kosong.";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }

    const phonePattern = /^[0-9]{10,}$/;
    if (!phone.trim()) {
      newErrors.phone = "Nomor HP tidak boleh kosong.";
    } else if (!phonePattern.test(phone)) {
      newErrors.phone = "Nomor HP hanya angka, minimal 10 digit.";
    }

    if (!password) {
      newErrors.password = "Password tidak boleh kosong.";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak boleh kosong.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    Alert.alert("Berhasil! 🎉", "Akun lo berhasil dibuat.");
    router.replace({ pathname: "/home", params: { userName: name } });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>🚀</Text>
            <Text style={styles.title}>Buat Akun</Text>
            <Text style={styles.subtitle}>Daftar sekarang, gratis!</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.steps}>
              {[1, 2, 3].map((s) => (
                <View key={s} style={[styles.step, s === 1 && styles.stepActive]} />
              ))}
            </View>

            {/* Nama */}
            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Nama lo..."
              placeholderTextColor="#BBBBBB"
              value={name}
              onChangeText={(v) => { setName(v); setErrors((e) => ({ ...e, name: "" })); }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="your@email.com"
              placeholderTextColor="#BBBBBB"
              value={email}
              onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: "" })); }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            {/* Phone */}
            <Text style={styles.label}>Nomor HP</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="08xxxxxxxxxx"
              placeholderTextColor="#BBBBBB"
              value={phone}
              onChangeText={(v) => { setPhone(v); setErrors((e) => ({ ...e, phone: "" })); }}
              keyboardType="number-pad"
              maxLength={14}
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Min. 6 karakter"
              placeholderTextColor="#BBBBBB"
              value={password}
              onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: "" })); }}
              secureTextEntry
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            {/* Confirm Password */}
            <Text style={styles.label}>Konfirmasi Password</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="Ulangi password lo"
              placeholderTextColor="#BBBBBB"
              value={confirmPassword}
              onChangeText={(v) => { setConfirmPassword(v); setErrors((e) => ({ ...e, confirmPassword: "" })); }}
              secureTextEntry
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

            <TouchableOpacity style={styles.btnRegister} onPress={handleRegister} activeOpacity={0.85}>
              <Text style={styles.btnText}>Daftar Sekarang →</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => router.replace("/")}
              activeOpacity={0.75}
            >
              <Text style={styles.btnLoginText}>Sudah punya akun? Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>© 2025 Super-App UNPRI</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  steps: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 24 },
  step: { width: 28, height: 5, borderRadius: 99, backgroundColor: "#EEEEEE" },
  stepActive: { backgroundColor: "#111111", width: 48 },
  label: {
    color: "#111111", fontSize: 12, fontWeight: "700",
    marginBottom: 8, textTransform: "uppercase", letterSpacing: 1,
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
    marginBottom: 4,
  },
  inputError: { borderColor: "#EF4444" },
  errorText: { color: "#EF4444", fontSize: 11, marginBottom: 14, marginLeft: 4 },
  btnRegister: {
    backgroundColor: "#111111",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 16,
  },
  btnText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  btnLogin: {
    paddingVertical: 14, borderRadius: 14, alignItems: "center",
    marginTop: 12, borderWidth: 1.5, borderColor: "#E5E5E5",
  },
  btnLoginText: { color: "#111111", fontWeight: "700", fontSize: 14 },
  footer: { textAlign: "center", color: "#CCCCCC", marginTop: 32, fontSize: 12 },
});