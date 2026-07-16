import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Notiflix from 'notiflix';
import Http from '@/utils/Http';
import AppLayout from '@/layouts/app-layout';
import { FacilityTable } from './components/FacilityTable';
import { AddFacilityModal } from './components/modals/AddFacilityModal';

export default function ManageFacility() {
    const { props } = usePage();
    const { facility: initialFacilities = [] } = props || {};

    const [loading, setLoading] = useState(false);
    const [facilities, setFacilities] = useState(initialFacilities);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [error, setError] = useState(null);

    const refreshFacilities = async () => {
        setLoading(true);
        setError(null);
        try {
            // Use the correct route with v1 prefix
            const response = await Http.get('/admin/facilities');
            const data = response.data?.data || response.data || [];
            setFacilities(Array.isArray(data) ? data : []);
            Notiflix.Notify.success('Facilities refreshed');
        } catch (err) {
            console.error('Error refreshing facilities:', err);
            setError('Failed to refresh facilities. Please try again.');
            Notiflix.Notify.failure('Failed to refresh facilities');
        } finally {
            setLoading(false);
        }
    };

    const handleAddFacility = async (formData) => {
        setLoading(true);
        try {
            const response = await Http.post('/admin/facilities', formData);
            const newFacility = response.data?.data || response.data;

            if (newFacility) {
                setFacilities(prev => [...prev, newFacility]);
                setIsModalOpen(false);
                Notiflix.Notify.success('Facility added successfully!');
                setError(null);
            }
        } catch (err) {
            console.error('Error adding facility:', err);
            const errorMessage = err.response?.data?.message || 'Failed to add facility. Please try again.';
            setError(errorMessage);
            Notiflix.Notify.failure(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateFacility = async (id, formData) => {
        setLoading(true);
        try {
            const response = await Http.put(`/admin/facilities/${id}`, formData);
            const updatedFacility = response.data?.data || response.data;

            if (updatedFacility) {
                setFacilities(prev => prev.map(f => f.id === id ? updatedFacility : f));
                setSelectedFacility(null);
                setIsModalOpen(false);
                Notiflix.Notify.success('Facility updated successfully!');
                setError(null);
            }
        } catch (err) {
            console.error('Error updating facility:', err);
            const errorMessage = err.response?.data?.message || 'Failed to update facility. Please try again.';
            setError(errorMessage);
            Notiflix.Notify.failure(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFacility = async (id) => {
        if (!confirm('Are you sure you want to delete this facility? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            await Http.delete(`/admin/facilities/${id}`);
            setFacilities(prev => prev.filter(f => f.id !== id));
            Notiflix.Notify.success('Facility deleted successfully!');
            setError(null);
        } catch (err) {
            console.error('Error deleting facility:', err);
            const errorMessage = err.response?.data?.message || 'Failed to delete facility. Please try again.';
            setError(errorMessage);
            Notiflix.Notify.failure(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleEditFacility = (facility) => {
        setSelectedFacility(facility);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedFacility(null);
        setError(null);
    };

    const totalFacilities = facilities?.length || 0;
    const activeCount = facilities?.filter(f => f.status === 'active').length || 0;
    const inactiveCount = facilities?.filter(f => f.status === 'inactive').length || 0;
    const pendingCount = facilities?.filter(f => f.status === 'pending').length || 0;

    return (
        <AppLayout  breadcrumbs={
            [
                {
                    title: 'Admin',
                    href:'/'
                },{
                title:'Facility Manangement',
                href: '/'
            }
            ]
        }>
            <div className="p-6 bg-slate-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-2 bg-white shadow-lg rounded-lg">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Manage Facilities
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Manage enrolled facilities and their details
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={refreshFacilities}
                            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors shadow-sm"
                            disabled={loading}
                        >
                            Refresh
                        </button>
                        <button
                            onClick={() => {
                                setSelectedFacility(null);
                                setIsModalOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-slate-800 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                            disabled={loading}
                        >
                            Add Facility
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <FacilityTable
                        facilities={facilities}
                        loading={loading}
                        onEdit={handleEditFacility}
                        onDelete={handleDeleteFacility}
                        onRefresh={refreshFacilities}
                    />
                </div>

                <AddFacilityModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                    onSubmit={selectedFacility ? handleUpdateFacility : handleAddFacility}
                    facility={selectedFacility}
                    loading={loading}
                />
            </div>
        </AppLayout>
    );
}
