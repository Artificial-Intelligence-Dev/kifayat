import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { adminDashboardStats } from "@/lib/admin.functions";
import { Package, ShoppingBag, Users, TrendingUp, Star, MessageCircle, AlertTriangle, Search as SearchIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const fn = useServerFn(adminDashboardStats);
  const { data, isLoading } = useQuery({ queryKey: ["admin-stats"], queryFn: () => fn() });

  if (isLoading) return <p className="eyebrow text-muted-foreground">Loading the ledger…</p>;
  if (!data) return <p className="text-sm text-muted-foreground">No data.</p>;

  const k = data.kpi;

  return (
    <div className="space-y-10">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi icon={TrendingUp} label="Revenue · 30d" value={`Rs ${Math.round(k.revenue_30d).toLocaleString()}`} sub={`Today: Rs ${Math.round(k.revenue_today).toLocaleString()}`} />
        <Kpi icon={ShoppingBag} label="Orders · 30d" value={k.orders_30d.toString()} sub={`Today: ${k.orders_today}`} />
        <Kpi icon={Package} label="AOV" value={`Rs ${Math.round(k.aov_30d).toLocaleString()}`} sub="Avg order value" />
        <Kpi icon={Users} label="Customers" value={k.customers_total.toString()} sub="Total registered" />
      </div>

      {/* Revenue chart */}
      <Panel title="Revenue · last 14 days" subtitle="Daily order revenue">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.revenue_series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a15" />
              <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} stroke="#1a1a1a60" fontSize={11} />
              <YAxis stroke="#1a1a1a60" fontSize={11} tickFormatter={(v) => `Rs ${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "#1a1a1a", border: "none", color: "#f5f1ea" }}
                formatter={(v: any) => [`Rs ${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Line type="monotone" dataKey="revenue" stroke="#c9a14a" strokeWidth={2} dot={{ fill: "#c9a14a", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders by status */}
        <Panel title="Orders by status" subtitle="Last 30 days">
          {data.orders_by_status.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No orders yet.</p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.orders_by_status}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a15" />
                  <XAxis dataKey="status" stroke="#1a1a1a60" fontSize={11} />
                  <YAxis stroke="#1a1a1a60" fontSize={11} />
                  <Tooltip contentStyle={{ background: "#1a1a1a", border: "none", color: "#f5f1ea" }} />
                  <Bar dataKey="count" fill="#1a1a1a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Panel>

        {/* Top products */}
        <Panel title="Top products" subtitle="By units sold (30d)">
          {data.top_products.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No sales yet.</p>
          ) : (
            <ul className="divide-y divide-coal/10">
              {data.top_products.map((p: any, i: number) => (
                <li key={i} className="flex items-center justify-between py-2.5">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-coal/40 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm font-medium truncate max-w-[200px]">{p.name}</span>
                  </span>
                  <span className="text-xs text-coal/60">{p.units} units · Rs {Math.round(p.revenue).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Low stock */}
        <Panel title="Low stock" subtitle="Restock soon (< 5 units)" icon={AlertTriangle} accent>
          {data.low_stock.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">All products well stocked.</p>
          ) : (
            <ul className="divide-y divide-coal/10">
              {data.low_stock.map((p: any) => (
                <li key={p.id} className="flex items-center justify-between py-2.5">
                  <Link to="/admin/products" className="text-sm hover:text-brass transition truncate max-w-[200px]">{p.name}</Link>
                  <span className={`eyebrow text-xs ${p.stock === 0 ? "text-destructive" : "text-coal/60"}`}>
                    {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Activity feed */}
        <Panel title="Activity">
          <div className="space-y-3">
            <ActivityRow icon={Star} label="Reviews pending" value={k.reviews_pending} link="/admin/orders" />
            <ActivityRow icon={MessageCircle} label="Questions pending" value={k.questions_pending} link="/admin/orders" />
            <ActivityRow icon={SearchIcon} label="Searches (7d)" value={k.searches_7d} link="/admin/orders" />
            <ActivityRow icon={Package} label="Products in catalog" value={k.products_total} link="/admin/products" />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="border border-coal/15 p-5 bg-bone">
      <div className="flex items-center justify-between mb-3">
        <p className="eyebrow text-coal/50 text-[10px]">{label}</p>
        <Icon className="size-4 text-brass" strokeWidth={1.4} />
      </div>
      <p className="font-display text-3xl lg:text-4xl">{value}</p>
      <p className="text-xs text-coal/50 mt-1">{sub}</p>
    </div>
  );
}

function Panel({ title, subtitle, children, icon: Icon, accent }: { title: string; subtitle?: string; children: React.ReactNode; icon?: any; accent?: boolean }) {
  return (
    <div className={`border ${accent ? "border-brass/40" : "border-coal/15"} p-5 lg:p-6 bg-bone`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="size-4 text-brass" strokeWidth={1.4} />}
        <div>
          <h3 className="font-display italic text-xl">{title}</h3>
          {subtitle && <p className="eyebrow text-coal/50 text-[10px] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function ActivityRow({ icon: Icon, label, value, link }: { icon: any; label: string; value: number; link: string }) {
  return (
    <Link to={link} className="flex items-center justify-between py-2 hover:text-brass transition group">
      <span className="flex items-center gap-3 text-sm">
        <Icon className="size-4 text-coal/40 group-hover:text-brass transition" strokeWidth={1.4} />
        {label}
      </span>
      <span className="font-mono text-sm">{value}</span>
    </Link>
  );
}
