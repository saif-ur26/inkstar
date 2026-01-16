import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const ADMIN_PASSWORD = 'inkstar@100';
const AUTH_KEY = 'inkstar_admin_auth';

interface AdminAuthProps {
    children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if already authenticated
        const authToken = sessionStorage.getItem(AUTH_KEY);
        if (authToken === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, password);
            setIsAuthenticated(true);
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setPassword('');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/30">
                <p className="text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/30 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <Lock className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">Admin Access</CardTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                            Enter password to access admin panel
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter admin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={error ? 'border-destructive' : ''}
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-sm text-destructive mt-2">{error}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full" size="lg">
                                <Lock className="mr-2 h-4 w-4" />
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-card border-b border-border">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        Logged in as <span className="font-medium text-foreground">Admin</span>
                    </p>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
            {children}
        </div>
    );
}
