import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

const Setup = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Avatar Storage Setup Required</h1>
          <p className="text-muted-foreground">
            The migration needs to be applied to enable avatar uploads
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-3 text-sm">
            <p className="text-yellow-500 font-semibold">
              Migration pending: Avatar storage bucket
            </p>
            <p className="text-muted-foreground">
              Since you're using Lovable, the migration at <code className="bg-muted px-1 py-0.5 rounded text-xs">supabase/migrations/20251130230000_setup_avatar_storage.sql</code> will be applied automatically when you:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-2">
              <li className="font-semibold">
                Deploy your app
                <p className="text-xs font-normal mt-1 ml-4">
                  Lovable automatically runs Supabase migrations during deployment
                </p>
              </li>
              <li className="font-semibold">
                Ask Lovable AI to "run migrations"
                <p className="text-xs font-normal mt-1 ml-4">
                  Use the chat to ask: "Please run the Supabase migrations"
                </p>
              </li>
              <li className="font-semibold">
                Contact Lovable support
                <p className="text-xs font-normal mt-1 ml-4">
                  They can manually trigger the migration for you
                </p>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <p className="font-semibold text-sm">What this migration does:</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
            <li>Creates an "avatars" storage bucket in Supabase</li>
            <li>Sets 5MB file size limit for images</li>
            <li>Allows users to upload/delete their own avatars</li>
            <li>Makes avatar images publicly accessible</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => window.location.href = "/updates"}
            className="flex-1"
            variant="outline"
          >
            Go to Updates Page
          </Button>
          <Button
            onClick={() => window.open("https://lovable.dev/docs", "_blank")}
            className="flex-1"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Lovable Docs
          </Button>
        </div>

        <div className="pt-4 border-t text-center text-xs text-muted-foreground space-y-1">
          <p>
            After the migration runs, avatar uploads will work automatically.
          </p>
          <p>
            You can delete this /setup page after confirming it works.
          </p>
        </div>
      </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Setup;
