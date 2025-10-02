import React, { useState } from 'react';
import { Download, Plus, ChevronDown, MapPin, Building2, Users, Star, Bed, Home } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/Components/ui/accordion';
import InteractiveGoogleMap from './inreactable-map';

const MapRegionOverview = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWorkers, setSelectedWorkers] = useState('all');

  const regions = [
    {
      id: 1,
      name: 'Region A - Downtown',
      buildings: 5,
      apartments: 150,
      color: 'blue',
      properties: [
        { name: 'Sunset Plaza', status: 'active', building: '30 Building', manager: 'John Smith' },
        { name: 'Ocean View Tower', status: 'pending', building: '45 Building', manager: 'Sarah Johnson' },
        { name: 'Metro Heights', status: 'issues', building: '25 Building', manager: 'Mike Davis' }
      ]
    },
    {
      id: 2,
      name: 'Region B - Uptown',
      buildings: 3,
      apartments: 90,
      color: 'blue',
      properties: [
        { name: 'Sunset Plaza', status: 'active', building: '30 Building', manager: 'John Smith' },
        { name: 'Ocean View Tower', status: 'pending', building: '45 Building', manager: 'Sarah Johnson' },
        { name: 'Metro Heights', status: 'issues', building: '25 Building', manager: 'Mike Davis' }
      ]
    },
    {
      id: 3,
      name: 'Region C - Suburbs',
      buildings: 4,
      apartments: 120,
      color: 'blue',
      properties: [
        { name: 'Sunset Plaza', status: 'active', building: '30 Building', manager: 'John Smith' },
        { name: 'Ocean View Tower', status: 'pending', building: '45 Building', manager: 'Sarah Johnson' },
        { name: 'Metro Heights', status: 'issues', building: '25 Building', manager: 'Mike Davis' }
      ]
    },
    {
      id: 4,
      name: 'Region D - Suburbs',
      buildings: 4,
      apartments: 120,
      color: 'blue',
      properties: [
        { name: 'Sunset Plaza', status: 'active', building: '30 Building', manager: 'John Smith' },
        { name: 'Ocean View Tower', status: 'pending', building: '45 Building', manager: 'Sarah Johnson' },
        { name: 'Metro Heights', status: 'issues', building: '25 Building', manager: 'Mike Davis' }
      ]
    }
  ];

  const featuredProperties = [
    {
      id: 1,
      name: 'Fully Furnished Smart Studio Apartment',
      rating: 4.8,
      location: 'Downtown LA',
      bedrooms: 2,
      bathrooms: 2,
      type: 'Entire Studio Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    },
    {
      id: 2,
      name: 'Furnished Apartment',
      rating: 4.2,
      location: 'Echo Park',
      bedrooms: 3,
      bathrooms: 2,
      type: 'Entire Studio Apartment',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
    },
    {
      id: 3,
      name: 'Classic Studio Apartment',
      rating: 4.5,
      location: 'Echo Park',
      bedrooms: 2,
      bathrooms: 1,
      type: 'Entire Studio Apartment',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'issues': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Map & Region Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Buildings & Regions Management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className="gap-2">
            <Plus size={16} />
            Add Building
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex gap-3">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
              <SelectItem value="uptown">Uptown</SelectItem>
              <SelectItem value="suburbs">Suburbs</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="issues">Issues</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedWorkers} onValueChange={setSelectedWorkers}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Workers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workers</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
          <h2 className="text-base font-semibold mb-3">Regions & Buildings</h2>

          {/* Region Cards */}
          <div className="flex gap-8 mb-6">
            {regions.map((region) => (
              <div key={region.id} className="bg-white rounded-lg border p-3 hover:shadow-md transition">

            <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
               <AccordionTrigger>
                  <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{region.name}</div>
                      <div className="text-xs text-gray-500">
                        {region.buildings} Buildings • {region.apartments} Apartments
                      </div>
                    </div>
                  </div>
                </div>
               </AccordionTrigger>
               <AccordionContent>
                                 {/* Buildings List (only for Region A) */}
                {region.id === 1 && region.properties && (
                  <div className="mt-3 space-y-2 border-t pt-2">
                    {region.properties.map((property, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(property.status)}`}></div>
                          <div>
                            <div className="text-xs font-medium">{property.name}</div>
                            <div className="text-xs text-gray-500">{property.building} • {property.status}</div>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs font-medium">{property.manager.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
               </AccordionContent>
            </AccordionItem>
            </Accordion>
              </div>
            ))}
          </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Regions & Buildings */}
        <div className="col-span-3 space-y-4">
          {/* Featured Properties */}
          <div className="mt-6">
            <div className="space-y-3">
              {featuredProperties.map((property) => (
                <div key={property.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <div className="font-semibold text-sm mb-1">{property.name}</div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium">{property.rating}</span>
                      <span className="text-xs text-gray-500">• {property.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Bed size={12} />
                        <span>{property.bedrooms} bedrooms</span>
                      </div>
                      <span>•</span>
                      <span>{property.bathrooms} bathrooms</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Home size={12} />
                      <span>{property.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="col-span-9">
          <div className="bg-white rounded-lg border p-4 h-[800px] relative">
            {/* Status Legend */}
            <div className="absolute top-6 left-6 bg-white rounded-lg shadow-lg p-3 z-10 border">
              <div className="font-semibold text-sm mb-2">Status Legend</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-xs">Active</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-xs">Issues</span>
                </div>
              </div>
            </div>

              <InteractiveGoogleMap />

              {/* Map Controls */}
              {/* <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition">
                  <Plus size={20} />
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition">
                  <span className="text-xl font-light">−</span>
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-50 transition">
                  <MapPin size={20} />
                </button>
              </div> */}

              {/* Location Label */}
              <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-lg px-3 py-2">
                <div className="text-sm font-semibold">Los Angeles</div>
                <div className="text-xs text-gray-500">Downtown District</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MapRegionOverview;
