import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AdminHeader } from '../../components/layout/admin/AdminHeader';
import { AdminStats } from '../../components/layout/admin/AdminStats';
import { ProvidersSection } from '../../components/layout/admin/ProvidersSection';
import { CategoriesSection } from '../../components/layout/admin/CategoriesSection';
import { ServicesSection } from '../../components/layout/admin/ServicesSection';
import { RatingsSection } from '../../components/layout/admin/RatingsSection';

export function AdminDashboard() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminHeader />

      <AdminStats />

      <Tabs defaultValue="providers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="providers" className="cursor-pointer">Prestadores</TabsTrigger>
          <TabsTrigger value="categories" className="cursor-pointer">Categorias</TabsTrigger>
          <TabsTrigger value="services" className="cursor-pointer">Serviços</TabsTrigger>
          <TabsTrigger value="ratings" className="cursor-pointer">Avaliações</TabsTrigger>
        </TabsList>

        {showAlert && (
          <Alert
            variant={alertType === 'error' ? 'destructive' : 'success'}
            className="mb-6"
            style={{borderColor: alertType === 'error' ? 'rgb(252, 4, 4)' :  'rgba(2, 196, 18, 1)'}}
          >
            <div
              className="col-start-2 grid justify-items-start gap-1 text-sm"
              style={{ 
                color: alertType === 'error' ? 'rgb(252 4 4)' : 'rgba(2, 196, 18, 1)'
              }}
            >
              {alertMessage}
            </div>
          </Alert>
        )}



        <TabsContent value="providers" className="space-y-6">
          <ProvidersSection 
            setAlertMessage={setAlertMessage} 
            setShowAlert={setShowAlert}
            setAlertType={setAlertType} 
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <CategoriesSection 
            setAlertMessage={setAlertMessage} 
            setShowAlert={setShowAlert} 
            setAlertType={setAlertType} 
          />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServicesSection 
            setAlertMessage={setAlertMessage} 
            setShowAlert={setShowAlert} 
            setAlertType={setAlertType}
          />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <RatingsSection
            setAlertMessage={setAlertMessage} 
            setShowAlert={setShowAlert} 
            setAlertType={setAlertType}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};