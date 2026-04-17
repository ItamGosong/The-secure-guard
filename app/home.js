import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const name = params.userName || "User";

  const menuItems = [
    { emoji: "📊", label: "Dashboard", color: "#6366F1" },
    { emoji: "👾", label: "Activity", color: "#06B6D4" },
    { emoji: "🔥", label: "Trending", color: "#F97316" },
    { emoji: "💬", label: "Messages", color: "#EC4899" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Selamat datang 👋</Text>
            <Text style={styles.username}>{name}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerBadge}>🔥 Active</Text>
          <Text style={styles.bannerTitle}>Lo udah masuk{"\n"}Dashboard! 🚀</Text>
          <Text style={styles.bannerSub}>Keep it up, semangat!</Text>
        </View>

        <View style={styles.statsRow}>
          {[
            { value: "99", label: "Posts" },
            { value: "1.2K", label: "Followers" },
            { value: "420", label: "Following" },
          ].map((stat, i) => (
            <View key={i} style={[styles.statCard, i === 1 && styles.statCardMid]}>
              <Text style={[styles.statValue, i === 1 && styles.statValueMid]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuCard, { borderColor: item.color + "33" }]}
              activeOpacity={0.75}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={[styles.menuLabel, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <Text style={styles.btnLogoutText}>Logout 👋</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scroll: { padding: 24, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
  },
  greeting: { fontSize: 13, color: "#AAAAAA", marginBottom: 2 },
  username: { fontSize: 22, fontWeight: "800", color: "#111111" },
  avatar: {
    width: 46, height: 46, borderRadius: 99,
    backgroundColor: "#111111",
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 18 },
  banner: {
    backgroundColor: "#111111",
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
  },
  bannerBadge: {
    fontSize: 12, color: "#AAAAAA", fontWeight: "700",
    backgroundColor: "#222222",
    alignSelf: "flex-start",
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 99, marginBottom: 14, overflow: "hidden",
  },
  bannerTitle: {
    fontSize: 26, fontWeight: "900", color: "#FFFFFF",
    lineHeight: 34, marginBottom: 8,
  },
  bannerSub: { fontSize: 14, color: "#888888" },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16,
    padding: 16, alignItems: "center",
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  statCardMid: { backgroundColor: "#111111" },
  statValue: { fontSize: 22, fontWeight: "900", color: "#111111", marginBottom: 4 },
  statValueMid: { color: "#FFFFFF" },
  statLabel: { fontSize: 12, color: "#AAAAAA", fontWeight: "600" },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111111", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 32 },
  menuCard: {
    width: "47%", backgroundColor: "#FFFFFF", borderRadius: 18,
    padding: 20, alignItems: "center", borderWidth: 1.5,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  menuEmoji: { fontSize: 32, marginBottom: 8 },
  menuLabel: { fontSize: 14, fontWeight: "700" },
  btnLogout: {
    borderWidth: 1.5, borderColor: "#E5E5E5",
    paddingVertical: 16, borderRadius: 14, alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  btnLogoutText: { color: "#AAAAAA", fontWeight: "700", fontSize: 15 },
});