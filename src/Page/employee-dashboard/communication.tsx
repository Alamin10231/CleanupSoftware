import { useState, useCallback } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/Components/ui/badge';
import { Card } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useGetEmployeeTasksQuery } from '@/redux/features/employee/EmployeeTask.api';

// Define interfaces for type safety
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Service {
  id: string;
  name: string;
  status: string;
  region_name: string;
  building_name: string;
  building_located_at: string;
  apartment_number?: string[] | null; // Allow undefined or null
  client_email?: string[] | null; // Allow undefined or null
  created_at: string;
}

interface EmployeeTasksResponse {
  results: Service[];
}

const ServiceTable = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const { data: employeeTasks, error, isLoading } = useGetEmployeeTasksQuery(undefined);

  const getStatusBadge = useCallback((status: string) => {
    const variants: Record<string, string> = {
      completed: 'default',
      pending: 'secondary',
      cancelled: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Thank you for your message. How can I help you with this service?',
            sender: 'bot',
          },
        ]);
      }, 1000);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">
            Error loading services: {(error as any).message || 'An error occurred'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Results</h1>
          <p className="text-gray-500 mt-1">Manage and view your service records</p>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Apartment</TableHead>
                <TableHead>Client Email</TableHead>
                <TableHead>Assigned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : !employeeTasks?.results?.length ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                (employeeTasks as EmployeeTasksResponse).results.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{getStatusBadge(service.status)}</TableCell>
                    <TableCell>{service.region_name}</TableCell>
                    <TableCell>{service.building_name}</TableCell>
                    <TableCell className="text-sm">{service.building_location}</TableCell>
                    {/* <TableCell>
                      {Array.isArray(service.apartment_number) && service.apartment_number.length > 0 ? (
                        service.apartment_number.map((apt, index) => (
                          <Badge key={index} variant="secondary" className="mr-1 mb-1">
                            {apt}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                    </TableCell> */}
                    <TableCell className="text-sm">
                      {Array.isArray(service.client_email) && service.client_email.length > 0
                        ? service.client_email[0]
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="text-sm">{service.created_at}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <Button
          onClick={() => setIsChatOpen(true)}
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          aria-label="Open chat support"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[425px] h-[600px] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Chat Support</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Start a conversation about your service
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-6 py-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
                aria-label="Type your message"
              />
              <Button onClick={handleSendMessage} size="icon" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceTable;