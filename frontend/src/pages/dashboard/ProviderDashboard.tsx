import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ProviderHeader } from '../../components/layout/provider/ProviderHeader';
import { OverView } from '../../components/layout/provider/OverView';
import { Services } from '../../components/layout/provider/Services';
import { Schedule } from '../../components/layout/provider/Schedule';
import { Gallery } from '../../components/layout/provider/Gallery';
import { Reviews } from '../../components/layout/provider/Reviews';

export function ProviderDashboard() {

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <ProviderHeader />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="schedule">Horários</TabsTrigger>
          <TabsTrigger value="gallery">Galeria</TabsTrigger>
          <TabsTrigger value="reviews">Avaliações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverView />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Services />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Schedule />
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
          <Gallery />
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Reviews />
        </TabsContent>
      </Tabs>
    </div>
  );
};