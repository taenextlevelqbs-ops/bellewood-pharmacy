import InventoryDashboard from "@/components/admin/InventoryDashboard";

export const metadata = {
  title: "Bellewood Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <InventoryDashboard />;
}
