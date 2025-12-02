import { DUMMY_LEADS } from '../_components/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftCircle, ArrowUpLeftFromSquare } from 'lucide-react';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const data: any = DUMMY_LEADS.find((lead) => lead.id === id);

  if (!data) {
    return <div className="p-6 text-center text-red-500">Lead not found.</div>;
  }

  const COMMENT_SECTIONS = [
    {
      title: 'Business Profile',
      fields: [
        'name',
        'businessType',
        'businessDescription',
        'registrationNumber',
        'taxId',
      ],
    },
    {
      title: 'Location',
      fields: ['street', 'city', 'state', 'postalCode', 'country'],
    },
    {
      title: 'Key Contact',
      fields: [
        'keyContactName',
        'keyContactPosition',
        'keyContactPhone',
        'keyContactEmail',
      ],
    },
    {
      title: 'Online Presence',
      fields: [
        'opFacebook',
        'opInstagram',
        'opLinkedin',
        'opTwitter',
        'opYoutube',
      ],
    },
    {
      title: 'Operations',
      fields: [
        'operationsOpeningHours',
        'operationsEmployees',
        'operationsTools',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <Button asChild>
          <Link href={'/b2b-leads'}>
            <ArrowLeftCircle />
            Back
          </Link>
        </Button>
      </div>
      <div className=" mx-auto  space-y-4">
        {COMMENT_SECTIONS.map((section) => (
          <Card key={section.title} className="rounded-sm">
            <CardHeader>
              <CardTitle className="text-lg">{section.title}</CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-2 gap-4">
              {section.fields.map((field) => (
                <div key={field}>
                  <p className="text-sm text-muted-foreground">
                    {field
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (c) => c.toUpperCase())}
                  </p>

                  <p className="font-medium">{data[field] || 'N/A'}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
