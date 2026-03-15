import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, DollarSign, LogOut, LayoutDashboard, Calculator, Camera, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<{
    full_name: string | null;
    avatar_url: string | null;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile in UserMenu:', error);
      // Fallback: fetch without avatar_url if it failed (likely missing column)
      const { data: fallbackData } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .maybeSingle();
      if (fallbackData) setProfile(fallbackData as any);
      return;
    }

    if (data) {
      setProfile(data as any);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      if (!event.target.files || event.target.files.length === 0 || !user) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setProfile(prev => ({ 
        full_name: prev?.full_name || null, 
        avatar_url: publicUrl 
      }));

      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: error?.message || "Error uploading avatar. Are you sure the 'avatars' bucket is created and publicly available?",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url;
  
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        disabled={isUploading}
      />
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-2 transition-all duration-200 hover:bg-white/5 data-[state=open]:bg-white/5 rounded-full">
            <Avatar className="h-9 w-9 border border-white/10 shadow-sm relative group">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-accent to-yellow-600 text-slate-900 font-bold text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline text-sm font-semibold max-w-[120px] truncate">
              {displayName}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-xl shadow-black/40 border-white/10 bg-slate-900/95 backdrop-blur-xl text-slate-200">
          <div className="p-3 flex flex-col items-center gap-3">
            <div 
              className="relative group cursor-pointer w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-md transition-transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              <Avatar className="h-full w-full">
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-accent to-yellow-600 text-slate-900 font-bold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              
              {/* Hover overlay & Loading state */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? (
                  <Loader2 className="h-5 w-5 text-accent animate-spin" />
                ) : (
                  <Camera className="h-6 w-6 text-white" />
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-center space-y-0.5">
              <span className="font-semibold text-white tracking-wide">{displayName}</span>
              <span className="text-xs text-slate-400 font-medium">{user.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator className="bg-white/10 my-2" />
          <DropdownMenuItem className="focus:bg-white/10 cursor-pointer rounded-xl font-medium" onClick={() => navigate('/dashboard')}>
            <LayoutDashboard className="mr-3 h-4 w-4 text-accent" />
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-white/10 cursor-pointer rounded-xl font-medium" onClick={() => navigate('/emi-calculator')}>
            <Calculator className="mr-3 h-4 w-4 text-accent" />
            EMI Calculator
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-white/10 cursor-pointer rounded-xl font-medium" onClick={() => navigate("/get-loan")}>
            <DollarSign className="mr-3 h-4 w-4 text-accent" />
            <span>Get Loan Amount</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="focus:bg-white/10 cursor-pointer rounded-xl font-medium" onClick={() => navigate("/repayment")}>
            <CreditCard className="mr-3 h-4 w-4 text-accent" />
            <span>Pay EMI (Repayment)</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10 my-2" />
          <DropdownMenuItem className="text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer rounded-xl font-semibold transition-colors" onClick={handleSignOut}>
            <LogOut className="mr-3 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
