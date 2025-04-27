import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { CarFront, Bike, Truck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/apiService';
import ParkingMap from '../../components/parking/ParkingMap';
import ZoneSelector from '../../components/parking/ZoneSelector';
import { ParkingSpot } from '../../types';

interface VehicleEntryFormInput {
  vehicleNumber: string;
  vehicleType: 'twoWheeler' | 'threeWheeler' | 'fourWheeler';
  color?: string;
  brand?: string;
}

const VehicleEntry: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entrySuccessful, setEntrySuccessful] = useState(false);
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [showSpotDetails, setShowSpotDetails] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<VehicleEntryFormInput>({
    defaultValues: {
      vehicleType: 'fourWheeler'
    }
  });

  const selectedVehicleType = watch('vehicleType');

  const onSubmit = async (data: VehicleEntryFormInput) => {
    setIsSubmitting(true);
    
    try {
      const vehicleEntry = {
        ...data,
        guardId: user?.id,
        guardName: user?.name,
        shift: user?.shift
      };
      
      const response = await apiService.createVehicleEntry(vehicleEntry);
      setVehicleData(response.data);
      setEntrySuccessful(true);

      // Navigate to the /guard route after the process is complete
      setTimeout(() => {
        navigate('/guard');
      }, 2000);  // Giving a small delay before navigating
    } catch (error) {
      console.error('Error creating vehicle entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewEntry = () => {
    setEntrySuccessful(false);
    setVehicleData(null);
  };

  const handleSpotClick = (spot: ParkingSpot) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
    } else {
      setSelectedSpot(spot);
      setShowSpotDetails(true);
    }
  };

  if (!entrySuccessful) {
    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <button 
            onClick={() => navigate('/guard')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>{t('common.back')}</span>
          </button>
        </div>
        
        <div className="card p-6 max-w-md mx-auto">
          <h1 className="text-xl font-bold text-gray-800 mb-6">
            {t('guard.vehicleEntry.title')}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">
                {t('guard.vehicleEntry.vehicleNumber')}
              </label>
              <input
                type="text"
                id="vehicleNumber"
                className={`input ${errors.vehicleNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="e.g., KA01AB1234"
                {...register('vehicleNumber', { 
                  required: t('validation.required'),
                  pattern: {
                    value: /^[A-Z0-9]{5,10}$/i,
                    message: t('validation.invalidVehicleNumber')
                  }
                })}
              />
              {errors.vehicleNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('guard.vehicleEntry.vehicleType')}
              </label>
              
              <div className="grid grid-cols-3 gap-4">
                <label 
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition
                    ${selectedVehicleType === 'twoWheeler' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }
                  `}>
                  <input
                    type="radio"
                    value="twoWheeler"
                    className="sr-only"
                    {...register('vehicleType', { required: true })}
                  />
                  <Bike size={24} />
                  <span className="text-sm font-medium">{t('guard.vehicleEntry.twoWheeler')}</span>
                </label>
                
                <label 
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition
                    ${selectedVehicleType === 'threeWheeler' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }
                  `}>
                  <input
                    type="radio"
                    value="threeWheeler"
                    className="sr-only"
                    {...register('vehicleType', { required: true })}
                  />
                  <Truck size={24} />
                  <span className="text-sm font-medium">{t('guard.vehicleEntry.threeWheeler')}</span>
                </label>
                
                <label 
                  className={`
                    flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition
                    ${selectedVehicleType === 'fourWheeler' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                    }
                  `}>
                  <input
                    type="radio"
                    value="fourWheeler"
                    className="sr-only"
                    {...register('vehicleType', { required: true })}
                  />
                  <CarFront size={24} />
                  <span className="text-sm font-medium">{t('guard.vehicleEntry.fourWheeler')}</span>
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{t('common.loading')}</span>
                </>
              ) : (
                <>
                  <CarFront size={18} />
                  <span>{t('common.submit')}</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Select Parking Spot
          </h2>
          
          <ZoneSelector />
          
          <div className="card">
            <ParkingMap onSpotClick={handleSpotClick} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/guard')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} className="mr-1" />
          <span>{t('common.back')}</span>
        </button>
      </div>
      
      <div className="card p-8 max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
            {t('guard.vehicleEntry.entrySuccess')}
          </h1>
          <p className="text-gray-600 mb-6">
            The vehicle has been successfully registered in the system.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleNewEntry}
            className="btn btn-primary flex-1"
          >
            Register Another Vehicle
          </button>
          <button
            onClick={() => navigate('/guard')}
            className="btn border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 flex-1"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleEntry;
