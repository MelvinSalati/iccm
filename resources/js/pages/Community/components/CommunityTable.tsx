import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useReactHookForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { CommunityOutreachRecord } from '../../CommunityPage';

const outreachTypes = [
    'Door to Door',
    'Community Meeting',
    'School Outreach',
    'Church Outreach',
    'Market Outreach',
    'Health Fair',
] as const;

const servicesOptions = [
    'Cervical Cancer Education',
    'VIA Screening',
    'HPV Vaccination',
    'HIV Testing',
    'Family Planning',
    'Breast Cancer Awareness',
    'Blood Pressure Screening',
    'Blood Sugar Screening',
    'Mental Health Education',
    'Nutrition Education',
] as const;

const formSchema = z.object({
    outreach_date: z.date({ required_error: 'Outreach date is required' }),
    community_name: z.string().min(1, 'Community name is required'),
    chw_name: z.string().min(1, 'CHW name is required'),
    outreach_type: z.enum(outreachTypes, { required_error: 'Outreach type is required' }),
    facility: z.string().min(1, 'Facility is required'),
    services: z.array(z.string()).min(1, 'At least one service must be selected'),
    women_reached: z.number().min(0, 'Must be 0 or greater'),
    awareness_session_conducted: z.boolean(),
    referred_for_screening: z.boolean(),
    referral_required: z.boolean().default(false),
    referred_facility: z.string().optional(),
    referral_date: z.date().optional(),
    referral_outcome: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CommunityOutreachFormProps {
    editingRecord?: CommunityOutreachRecord | null;
    onSuccess: () => void;
}

export default function CommunityOutreachForm({
                                                  editingRecord,
                                                  onSuccess,
                                              }: CommunityOutreachFormProps) {
    const { post, put, processing } = useForm();

    const form = useReactHookForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            outreach_date: new Date(),
            community_name: '',
            chw_name: '',
            outreach_type: undefined,
            facility: '',
            services: [],
            women_reached: 0,
            awareness_session_conducted: false,
            referred_for_screening: false,
            referral_required: false,
            referred_facility: '',
            referral_date: undefined,
            referral_outcome: '',
        },
    });

    const watchReferralRequired = form.watch('referral_required');

    useEffect(() => {
        if (editingRecord) {
            form.reset({
                outreach_date: new Date(editingRecord.outreach_date),
                community_name: editingRecord.community_name,
                chw_name: editingRecord.chw_name,
                outreach_type: editingRecord.outreach_type as any,
                facility: editingRecord.facility,
                services: editingRecord.services,
                women_reached: editingRecord.women_reached,
                awareness_session_conducted: editingRecord.awareness_session_conducted,
                referred_for_screening: editingRecord.referred_for_screening,
                referral_required: editingRecord.referral_required,
                referred_facility: editingRecord.referred_facility || '',
                referral_date: editingRecord.referral_date ? new Date(editingRecord.referral_date) : undefined,
                referral_outcome: editingRecord.referral_outcome || '',
            });
        }
    }, [editingRecord, form]);

    const onSubmit = (values: FormValues) => {
        const url = editingRecord
            ? route('community-outreach.update', editingRecord.id)
            : route('community-outreach.store');

        const payload = {
            ...values,
            outreach_date: values.outreach_date.toISOString().split('T')[0],
            referral_date: values.referral_date?.toISOString().split('T')[0],
        };

        if (editingRecord) {
            put(url, {
                data: payload,
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    onSuccess();
                },
            });
        } else {
            post(url, {
                data: payload,
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    onSuccess();
                },
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Outreach Date */}
                    <FormField
                        control={form.control}
                        name="outreach_date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-xs font-medium">Outreach Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    'h-9 w-full justify-start text-left font-normal',
                                                    !field.value && 'text-muted-foreground'
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, 'PPP') : 'Select date'}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Community Name */}
                    <FormField
                        control={form.control}
                        name="community_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">Community Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter community name" {...field} className="h-9" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CHW Name */}
                    <FormField
                        control={form.control}
                        name="chw_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">CHW Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter CHW name" {...field} className="h-9" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Outreach Type */}
                    <FormField
                        control={form.control}
                        name="outreach_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">Outreach Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select outreach type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {outreachTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Facility */}
                    <FormField
                        control={form.control}
                        name="facility"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel className="text-xs font-medium">Facility</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select facility" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="facility-1">Facility 1</SelectItem>
                                        <SelectItem value="facility-2">Facility 2</SelectItem>
                                        <SelectItem value="facility-3">Facility 3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Services Provided */}
                <div className="space-y-2">
                    <FormLabel className="text-xs font-medium">Services Provided</FormLabel>
                    <FormField
                        control={form.control}
                        name="services"
                        render={() => (
                            <FormItem>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    {servicesOptions.map((service) => (
                                        <FormField
                                            key={service}
                                            control={form.control}
                                            name="services"
                                            render={({ field }) => {
                                                return (
                                                    <FormItem
                                                        key={service}
                                                        className="flex flex-row items-start space-x-2 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(service)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, service])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value) => value !== service
                                                                            )
                                                                        );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-xs font-normal cursor-pointer">
                                                            {service}
                                                        </FormLabel>
                                                    </FormItem>
                                                );
                                            }}
                                        />
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Outreach Results */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FormField
                        control={form.control}
                        name="women_reached"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">Women Reached</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="0"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        className="h-9"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="awareness_session_conducted"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">Awareness Session Conducted</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value === 'true')}
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="referred_for_screening"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs font-medium">Referred for Screening</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange(value === 'true')}
                                    value={field.value?.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Referral Information */}
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="referral_required"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="text-xs font-medium cursor-pointer">
                                    Referral Required
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    {watchReferralRequired && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pl-6 border-l-2 border-blue-200">
                            <FormField
                                control={form.control}
                                name="referred_facility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium">Referred Facility</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter facility name" {...field} className="h-9" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referral_date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-xs font-medium">Referral Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            'h-9 w-full justify-start text-left font-normal',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, 'PPP') : 'Select date'}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="referral_outcome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-medium">Referral Outcome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter outcome" {...field} className="h-9" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 pt-4 mt-6 border-t bg-white flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        className="h-9"
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" className="h-9" disabled={processing}>
                        {processing ? 'Saving...' : editingRecord ? 'Update' : 'Save'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
