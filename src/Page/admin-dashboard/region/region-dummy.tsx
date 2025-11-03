import { useMemo } from "react";
import {
  MapPin,
  Building2,
  Home,
  Users,
  Layers,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { EmptyState } from "@/Components/Error";
import { useGetRegionsQuery } from "@/redux/features/admin/regions/regions.api";
import { TreeView } from "@/Components/tree-view";
import { Badge } from "@/Components/ui/badge";

const RegionsHierarchy = () => {
  const { data: regionsData, isLoading, error } = useGetRegionsQuery();
  const regions = regionsData?.results || [];

  // 🧠 Transform API data → TreeView format
  const treeData: TreeDataItem[] = useMemo(() => {
    return regions.map((region) => ({
      id: `region-${region.id}`,
      name: `${region.name} (${region.total_buildings} buildings)`,
      icon: MapPin,
      children:
        region.buildings?.map((building) => ({
          id: `building-${building.id}`,
          name: building.name,
          icon: Building2,
          actions: (
            <div className="flex gap-1 items-center">
              <Badge variant="outline" className="capitalize text-xs">
                {building.type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {building.total_apartments} Apts
              </Badge>
              {building.active_apartments_in_building > 0 && (
                <Badge className="bg-green-500 text-xs">
                  {building.active_apartments_in_building} Active
                </Badge>
              )}
            </div>
          ),
          children:
            building.apartments?.map((apartment) => ({
              id: `apartment-${apartment.id}`,
              name: `Apt ${apartment.apartment_number} • Floor ${apartment.floor}`,
              icon: Home,
              children: [
                {
                  id: `client-${apartment.client_name}-${apartment.id}`,
                  name: apartment.client_name || "No client assigned",
                  icon: Users,
                  actions: apartment.client_email && (
                    <span className="text-xs text-muted-foreground">
                      {apartment.client_email}
                    </span>
                  ),
                },
              ],
            })) || [],
        })) || [],
    }));
  }, [regions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading regions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive font-semibold">
          Failed to load regions.
        </p>
      </div>
    );
  }

  if (!regions.length) {
    return (
      <EmptyState
        icon={<MapPin className="h-12 w-12" />}
        title="No Regions Found"
        description="No regions have been added yet."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Regions Hierarchy</h2>
        <p className="text-muted-foreground mt-1">
          Explore regions, buildings, apartments, and clients
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Regions</CardDescription>
            <CardTitle className="text-3xl">{regions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Buildings</CardDescription>
            <CardTitle className="text-3xl">
              {regions.reduce((sum, r) => sum + r.total_buildings, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Apartments</CardDescription>
            <CardTitle className="text-3xl">
              {regions.reduce((sum, r) => sum + r.total_apartments, 0)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Active Apartments</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {regions.reduce(
                (sum, r) =>
                  sum +
                  r.buildings.reduce(
                    (bSum, b) => bSum + b.active_apartments_in_building,
                    0
                  ),
                0
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Layers className="h-4 w-4 text-green-600" />
          </CardContent>
        </Card>
      </div>

      {/* Tree View */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hierarchy Tree</CardTitle>
          <CardDescription>
            Expand to view buildings, apartments, and clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TreeView
            data={treeData}
            expandAll
            defaultNodeIcon={<MapPin className="h-4 w-4 text-muted-foreground" />}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionsHierarchy;
