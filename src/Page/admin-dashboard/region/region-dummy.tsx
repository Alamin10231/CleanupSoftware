import { useState } from 'react';
import { Building2, Home, Users, ChevronRight, MapPin, Layers } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import ErrorComponent, { EmptyState } from '@/Components/Error';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/Components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useGetRegionsQuery } from '@/redux/features/admin/regions/regions.api';

const RegionsHierarchy = () => {
  const { data: regionsData, isLoading, error } = useGetRegionsQuery();
  const [expandedRegions, setExpandedRegions] = useState<Set<number>>(new Set());
  const [expandedBuildings, setExpandedBuildings] = useState<Set<number>>(new Set());
  const [expandedApartments, setExpandedApartments] = useState<Set<number>>(new Set());
   const regions = regionsData?.results || [];

  const toggleRegion = (regionId: number) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionId)) {
      newExpanded.delete(regionId);
    } else {
      newExpanded.add(regionId);
    }
    setExpandedRegions(newExpanded);
  };

  const toggleBuilding = (buildingId: number) => {
    const newExpanded = new Set(expandedBuildings);
    if (newExpanded.has(buildingId)) {
      newExpanded.delete(buildingId);
    } else {
      newExpanded.add(buildingId);
    }
    setExpandedBuildings(newExpanded);
  };

  const toggleApartment = (apartmentId: number) => {
    const newExpanded = new Set(expandedApartments);
    if (newExpanded.has(apartmentId)) {
      newExpanded.delete(apartmentId);
    } else {
      newExpanded.add(apartmentId);
    }
    setExpandedApartments(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading regions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorComponent
        type="error"
        title="Failed to Load Regions"
        message="There was an error loading the regions data."
      />
    );
  }

  if (!regions || regions.length === 0) {
    return (
      <EmptyState
        icon={<MapPin className="h-16 w-16" />}
        title="No Regions Found"
        description="No regions have been added yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Regions Hierarchy</h2>
        <p className="text-muted-foreground mt-1">
          Browse regions, buildings, apartments, and clients
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Regions</CardDescription>
            <CardTitle className="text-3xl">{regions.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
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
          <CardHeader className="pb-3">
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
          <CardHeader className="pb-3">
            <CardDescription>Active Apartments</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {regions.reduce((sum, r) =>
                sum + r.buildings.reduce((bSum, b) =>
                  bSum + b.active_apartments_in_building, 0
                ), 0
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Layers className="h-4 w-4 text-green-600" />
          </CardContent>
        </Card>
      </div>

      {/* Hierarchy Tree */}
      <div className="space-y-3">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <Collapsible
                open={expandedRegions.has(region.id)}
                onOpenChange={() => toggleRegion(region.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{region.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {region.total_buildings} Buildings • {region.total_apartments} Apartments
                        </CardDescription>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        expandedRegions.has(region.id) ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="pt-4">
                  <Separator className="mb-4" />

                  {region.buildings.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No buildings in this region
                    </p>
                  ) : (
                    <div className="space-y-2 ml-8">
                      {region.buildings.map((building) => (
                        <Card key={building.id} className="border-l-4 border-l-purple-500">
                          <CardHeader className="py-3 cursor-pointer hover:bg-muted/50 transition-colors">
                            <Collapsible
                              open={expandedBuildings.has(building.id)}
                              onOpenChange={() => toggleBuilding(building.id)}
                            >
                              <CollapsibleTrigger asChild>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-3">
                                    <Building2 className="h-5 w-5 text-purple-600" />
                                    <div>
                                      <h4 className="font-semibold">{building.name}</h4>
                                      <p className="text-sm text-muted-foreground">
                                        {building.city} • {building.location}
                                      </p>
                                      <div className="flex gap-2 mt-1">
                                        <Badge variant="outline" className="capitalize">
                                          {building.type}
                                        </Badge>
                                        <Badge variant="secondary">
                                          {building.total_apartments} Apartments
                                        </Badge>
                                        {building.active_apartments_in_building > 0 && (
                                          <Badge className="bg-green-500">
                                            {building.active_apartments_in_building} Active
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      expandedBuildings.has(building.id) ? 'rotate-90' : ''
                                    }`}
                                  />
                                </div>
                              </CollapsibleTrigger>

                              <CollapsibleContent className="pt-3">
                                <Separator className="mb-3" />

                                {building.apartments.length === 0 ? (
                                  <p className="text-sm text-muted-foreground text-center py-3">
                                    No apartments in this building
                                  </p>
                                ) : (
                                  <div className="space-y-2 ml-6">
                                    {building.apartments.map((apartment) => (
                                      <Card key={apartment.id} className="border-l-4 border-l-orange-500">
                                        <CardHeader className="py-3 cursor-pointer hover:bg-muted/50 transition-colors">
                                          <Collapsible
                                            open={expandedApartments.has(apartment.id)}
                                            onOpenChange={() => toggleApartment(apartment.id)}
                                          >
                                            <CollapsibleTrigger asChild>
                                              <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-3 flex-1">
                                                  <Home className="h-4 w-4 text-orange-600" />
                                                  <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <h5 className="font-semibold">
                                                        Apt {apartment.apartment_number}
                                                      </h5>
                                                      <Badge variant="outline" className="text-xs">
                                                        Floor {apartment.floor}
                                                      </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                      {apartment.living_rooms} Rooms • {apartment.bathrooms} Baths
                                                      {apartment.outdoor_area && ' • Outdoor Area'}
                                                    </p>
                                                  </div>
                                                </div>
                                                <ChevronRight
                                                  className={`h-4 w-4 transition-transform ${
                                                    expandedApartments.has(apartment.id) ? 'rotate-90' : ''
                                                  }`}
                                                />
                                              </div>
                                            </CollapsibleTrigger>

                                            <CollapsibleContent className="pt-3">
                                              <Separator className="mb-3" />

                                              {/* Client Info */}
                                              <div className="ml-6 bg-muted/50 rounded-lg p-3">
                                                <div className="flex items-center gap-3">
                                                  <Avatar className="h-10 w-10">
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                                      {apartment?.client_name
                                                        ?.split(' ')
                                                        ?.map(n => n[0])
                                                        .join('')
                                                        .toUpperCase()
                                                        .slice(0, 2)}
                                                    </AvatarFallback>
                                                  </Avatar>
                                                  <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                      <Users className="h-4 w-4 text-blue-600" />
                                                      <p className="font-semibold">
                                                        {apartment.client_name}
                                                      </p>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                      {apartment.client_email}
                                                    </p>
                                                  </div>
                                                  <Button size="sm" variant="outline">
                                                    View Client
                                                  </Button>
                                                </div>

                                                {/* Apartment Codes */}
                                                {(apartment.apartment_code || apartment.apartment_code2) && (
                                                  <div className="mt-3 pt-3 border-t">
                                                    <p className="text-xs text-muted-foreground mb-1">
                                                      Apartment Codes
                                                    </p>
                                                    <div className="flex gap-2">
                                                      {apartment.apartment_code && (
                                                        <code className="text-xs bg-background px-2 py-1 rounded">
                                                          {apartment.apartment_code}
                                                        </code>
                                                      )}
                                                      {apartment.apartment_code2 && (
                                                        <code className="text-xs bg-background px-2 py-1 rounded">
                                                          {apartment.apartment_code2}
                                                        </code>
                                                      )}
                                                    </div>
                                                  </div>
                                                )}
                                              </div>
                                            </CollapsibleContent>
                                          </Collapsible>
                                        </CardHeader>
                                      </Card>
                                    ))}
                                  </div>
                                )}
                              </CollapsibleContent>
                            </Collapsible>
                          </CardHeader>
                        </Card>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RegionsHierarchy;
