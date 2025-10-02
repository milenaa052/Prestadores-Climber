import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ClientHeader } from '../../components/layout/client/ClientHeader';
import { Requests } from '../../components/layout/client/Requests';
import { Reviews } from '../../components/layout/client/Reviews';
import { Favorites } from '../../components/layout/client/Favorites';

export function ClientDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <ClientHeader />

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
          <TabsTrigger value="reviews">Minhas Avaliações</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <Requests />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Reviews />
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <Favorites />
        </TabsContent>
      </Tabs>
    </div>
  );
};