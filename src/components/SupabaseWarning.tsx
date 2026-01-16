import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { isSupabaseConfigured } from '@/lib/supabase';

export function SupabaseWarning() {
    if (isSupabaseConfigured) return null;

    return (
        <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Supabase Not Configured</AlertTitle>
            <AlertDescription>
                You're viewing mock data. To use the full backend, set up Supabase:
                <br />
                1. Create a Supabase project at{' '}
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline">
                    supabase.com
                </a>
                <br />
                2. Add your credentials to the <code>.env</code> file
                <br />
                3. See <code>QUICKSTART.md</code> for detailed instructions
            </AlertDescription>
        </Alert>
    );
}
