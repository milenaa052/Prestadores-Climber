import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AdminHeader } from '../../components/layout/admin/AdminHeader';
import { AdminStats } from '../../components/layout/admin/AdminStats';
import { ProvidersSection } from '../../components/layout/admin/ProvidersSection';
import { ServicesSection } from '../../components/layout/admin/ServicesSection';
import { RatingsSection } from '../../components/layout/admin/RatingsSection';
import { SettingsSection } from '../../components/layout/admin/SettingsSection';

export function AdminDashboard() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminHeader />

      {showAlert && (
        <Alert className="mb-6">
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <AdminStats />

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers">Prestadores</TabsTrigger>
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="ratings">Avaliações</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <ProvidersSection setAlertMessage={setAlertMessage} setShowAlert={setShowAlert} />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServicesSection />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <RatingsSection />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <SettingsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};