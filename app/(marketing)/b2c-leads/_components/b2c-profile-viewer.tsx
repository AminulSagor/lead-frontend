import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { B2C_SECTIONS } from './b2c-sections';

const B2CProfileViewer = ({ data }: { data: any }) => {
  return (
    <div className="space-y-4">
      {B2C_SECTIONS.map((section) => (
        <Card key={section.title} className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-4 gap-4">
            {section.fields.map((field) => (
              <div key={field}>
                <p className="text-sm text-muted-foreground">
                  {field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (c) => c.toUpperCase())}
                </p>

                <p className="font-medium">
                  {data[field] && data[field] !== '' ? data[field] : 'N/A'}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default B2CProfileViewer;
