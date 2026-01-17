'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  GraduationCap, 
  Euro, 
  Calendar,
  Phone,
  Mail,
  Globe,
  Users,
  Clock,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Coins,
  Tag,
  Award,
  Info
} from 'lucide-react';
import Link from 'next/link';

interface Internship {
  id: string;
  aantal: number;
  contactpersoon: string | null;
  emailadres: string | null;
  telefoon: string | null;
  omschrijving: string | null;
  titel: string | null;
  wervende_titel: string | null;
  vaardigheden: string | null;
  aanbieden: string | null;
  website: string | null;
  adres_huisnummer: string | null;
  adres_plaats: string | null;
  adres_postcode: string | null;
  adres_straat: string | null;
  adres_lat: number | null;
  adres_lon: number | null;
  organisatie_id: string | null;
  organisatie_naam: string | null;
  organisatie_telefoon: string | null;
  organisatie_email: string | null;
  organisatie_website: string | null;
  organisatie_logo: string | null;
  organisatie_grootte: string | null;
  organisatie_leerbedrijf_id: string | null;
  organisatie_omschrijving: string | null;
  kerntaken: Array<{
    code: string;
    naam: string;
    subtaken?: Array<{
      code: string;
      naam: string;
      uitvoerbaar?: boolean;
    }>;
  }> | null;
  kenmerken: Array<{
    code?: string;
    naam?: string;
    waarde?: string | boolean;
  }> | string[] | null;
  media: { url: string; type: string }[] | null;
  vergoedingen: Array<{
    type?: string;
    naam?: string;
    bedrag?: number;
    eenheid?: string;
    omschrijving?: string;
  }> | null;
  bedrag_van: number | null;
  bedrag_tot: number | null;
  kwalificatie_niveau: string | null;
  kwalificatie_crebocode: string | null;
  startdatum: string | null;
  einddatum: string | null;
  gewijzigd_datum: string | null;
  leerweg: string | null;
  study_description: string | null;
  dagen_per_week: string | null;
}

export default function InternshipDetailPage() {
  const params = useParams();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    async function fetchInternship() {
      try {
        const res = await fetch(`/api/listings/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            setError('Stage niet gevonden');
          } else {
            setError('Er ging iets mis');
          }
          return;
        }
        const data = await res.json();
        setInternship(data);
      } catch {
        setError('Kon de stage niet laden');
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchInternship();
    }
  }, [params.id]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatCompensation = (min: number | null, max: number | null) => {
    if (!min && !max) return null;
    if (min && max && min === max) return `€${min} per maand`;
    if (min && max) return `€${min} - €${max} per maand`;
    if (min) return `Vanaf €${min} per maand`;
    if (max) return `Tot €${max} per maand`;
    return null;
  };

  const getFullAddress = () => {
    const parts = [];
    if (internship?.adres_straat) parts.push(internship.adres_straat);
    if (internship?.adres_huisnummer) parts.push(internship.adres_huisnummer);
    const street = parts.join(' ');
    
    const cityParts = [];
    if (internship?.adres_postcode) cityParts.push(internship.adres_postcode);
    if (internship?.adres_plaats) cityParts.push(internship.adres_plaats);
    const city = cityParts.join(' ');
    
    if (street && city) return `${street}, ${city}`;
    return street || city || null;
  };

  // Parse media - handle both array and JSON string
  const getMedia = () => {
    if (!internship?.media) return [];
    
    let mediaArray = internship.media;
    
    // If it's a string, try to parse it
    if (typeof mediaArray === 'string') {
      try {
        mediaArray = JSON.parse(mediaArray);
      } catch {
        return [];
      }
    }
    
    if (!Array.isArray(mediaArray)) return [];
    
    // Filter for images only and ensure valid URLs
    return mediaArray.filter((item: { url?: string; type?: string }) => {
      if (!item?.url) return false;
      const typeLC = item.type?.toLowerCase() || '';
      const isImage = !item.type || typeLC === 'image' || typeLC.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(item.url);
      return isImage;
    });
  };

  const mediaItems = internship ? getMedia() : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen"
        style={{
          background: 'linear-gradient(to bottom, #40dacf 0%, #e0f7f4 50%, #f0fdf9 100%)'
        }}
      >
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-4">
            <Link href="/stages" className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Terug naar stages
            </Link>
          </div>
        </nav>
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8">
          <Skeleton className="h-10 w-2/3 mb-4" />
          <Skeleton className="h-6 w-1/3 mb-8" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(to bottom, #40dacf 0%, #e0f7f4 50%, #f0fdf9 100%)'
        }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{error || 'Stage niet gevonden'}</h1>
          <Link href="/stages" className="text-teal-600 hover:text-teal-700 inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Terug naar stages
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #40dacf 0%, #e0f7f4 50%, #f0fdf9 100%)'
      }}
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          <Link href="/stages" className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Terug naar stages
          </Link>
          <Link href="/" className="font-semibold text-slate-900 hover:text-slate-700 transition-colors">
            easystage.nl
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="px-6 sm:px-8 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Logo */}
            {internship.organisatie_logo && (
              <div className="shrink-0">
                <img 
                  src={internship.organisatie_logo} 
                  alt={internship.organisatie_naam || ''} 
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-xl bg-white p-2 shadow-lg"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            )}
            
            {/* Title Info */}
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-3">
                {internship.wervende_titel || internship.titel || 'Stage'}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-700">
                {internship.organisatie_naam && (
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {internship.organisatie_naam}
                  </span>
                )}
                {internship.adres_plaats && (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {internship.adres_plaats}
                  </span>
                )}
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {internship.kwalificatie_niveau && (
                  <Badge className="bg-teal-500 text-white border-0 text-sm px-3 py-1">
                    <GraduationCap className="h-4 w-4 mr-1" />
                    {internship.kwalificatie_niveau}
                  </Badge>
                )}
                {internship.leerweg && (
                  <Badge variant="outline" className="text-slate-700 border-slate-300 text-sm px-3 py-1">
                    {internship.leerweg}
                  </Badge>
                )}
                {formatCompensation(internship.bedrag_van, internship.bedrag_tot) && (
                  <Badge className="bg-emerald-500 text-white border-0 text-sm px-3 py-1">
                    <Euro className="h-4 w-4 mr-1" />
                    {formatCompensation(internship.bedrag_van, internship.bedrag_tot)}
                  </Badge>
                )}
                {internship.aantal && internship.aantal > 1 && (
                  <Badge variant="outline" className="text-slate-700 border-slate-300 text-sm px-3 py-1">
                    <Users className="h-4 w-4 mr-1" />
                    {internship.aantal} plekken
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Media Gallery */}
      {mediaItems.length > 0 && (
        <section className="px-6 sm:px-8 pb-6">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-white/90 backdrop-blur border-slate-200/50 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-teal-600" />
                  Foto&apos;s ({mediaItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`grid gap-3 ${
                  mediaItems.length === 1 ? 'grid-cols-1' :
                  mediaItems.length === 2 ? 'grid-cols-2' :
                  mediaItems.length === 3 ? 'grid-cols-3' :
                  'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
                }`}>
                  {mediaItems.map((item: { url: string; type?: string }, index: number) => (
                    <button
                      key={index}
                      onClick={() => openLightbox(index)}
                      className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                      <img
                        src={item.url}
                        alt={`Afbeelding ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { 
                          e.currentTarget.parentElement!.style.display = 'none';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && mediaItems.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Sluiten"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Navigation */}
          {mediaItems.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Vorige"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Volgende"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={mediaItems[lightboxIndex]?.url}
            alt={`Afbeelding ${lightboxIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {lightboxIndex + 1} / {mediaItems.length}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <main className="px-6 sm:px-8 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              {internship.omschrijving && (
                <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-teal-600" />
                      Over deze stage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {internship.omschrijving}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Skills */}
              {internship.vaardigheden && (
                <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600" />
                      Gevraagde vaardigheden
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {internship.vaardigheden.split('\n').filter(line => line.trim()).map((line, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                          {line.trim()}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* What they offer */}
              {internship.aanbieden && (
                <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      Wat bieden wij
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {internship.aanbieden.split('\n').filter(line => line.trim()).map((line, index) => (
                        <li key={index} className="flex items-start gap-2 text-slate-700">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          {line.trim()}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Core Tasks */}
              {internship.kerntaken && (() => {
                // Parse kerntaken if it's a string
                let kerntakenData = internship.kerntaken;
                if (typeof kerntakenData === 'string') {
                  try {
                    kerntakenData = JSON.parse(kerntakenData);
                  } catch {
                    return null;
                  }
                }
                if (!Array.isArray(kerntakenData) || kerntakenData.length === 0) return null;

                return (
                  <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-teal-600" />
                        Kerntaken
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {kerntakenData.map((task, index) => (
                        <div key={index}>
                          {/* Main task */}
                          <div className="flex items-start gap-2 mb-3">
                            <CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-xs font-mono text-slate-400 block">{task.code}</span>
                              <span className="font-medium text-slate-900">{task.naam}</span>
                            </div>
                          </div>
                          
                          {/* Subtasks */}
                          {task.subtaken && task.subtaken.length > 0 && (
                            <ul className="ml-7 space-y-2 border-l-2 border-slate-200 pl-4">
                              {task.subtaken.map((subtask, subIndex) => (
                                <li key={subIndex} className="flex items-start gap-2 text-slate-600 text-sm">
                                  <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${subtask.uitvoerbaar ? 'text-emerald-500' : 'text-slate-300'}`} />
                                  <div>
                                    <span className="text-xs font-mono text-slate-400">{subtask.code}</span>
                                    <span className="ml-2">{subtask.naam}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Compensations / Vergoedingen */}
              {internship.vergoedingen && (() => {
                // Parse vergoedingen if it's a string
                let vergoedingData = internship.vergoedingen;
                if (typeof vergoedingData === 'string') {
                  try {
                    vergoedingData = JSON.parse(vergoedingData);
                  } catch {
                    return null;
                  }
                }
                if (!Array.isArray(vergoedingData) || vergoedingData.length === 0) return null;

                return (
                  <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-emerald-600" />
                        Vergoedingen
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {vergoedingData.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50">
                            <Euro className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="font-medium text-slate-900">
                                {item.omschrijving || 'Vergoeding'}
                              </span>
                              {item.bedrag !== undefined && item.bedrag !== null && (
                                <span className="ml-2 text-emerald-700 font-semibold">
                                  €{item.bedrag}
                                  {item.eenheid && <span className="text-slate-500 font-normal"> / {item.eenheid}</span>}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Kenmerken / Characteristics */}
              {internship.kenmerken && (() => {
                // Parse kenmerken if it's a string
                let kenmerkenData = internship.kenmerken;
                if (typeof kenmerkenData === 'string') {
                  try {
                    kenmerkenData = JSON.parse(kenmerkenData);
                  } catch {
                    return null;
                  }
                }
                if (!Array.isArray(kenmerkenData) || kenmerkenData.length === 0) return null;

                return (
                  <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Tag className="h-5 w-5 text-teal-600" />
                        Kenmerken
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {kenmerkenData.map((item, index) => {
                          // Handle both string items and object items
                          const label = typeof item === 'string' 
                            ? item 
                            : (item.naam || item.waarde || item.code || JSON.stringify(item));
                          
                          return (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="bg-slate-100 text-slate-700 border-0 px-3 py-1"
                            >
                              {label}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}

              {/* Company Description */}
              {internship.organisatie_omschrijving && (
                <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-teal-600" />
                      Over {internship.organisatie_naam || 'het bedrijf'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {internship.organisatie_omschrijving}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Qualification Details */}
              {(internship.titel || internship.kwalificatie_crebocode || internship.study_description) && (
                <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-teal-600" />
                      Opleiding
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {internship.titel && (
                      <div>
                        <span className="text-sm text-slate-500">Kwalificatie</span>
                        <p className="text-slate-900 font-medium">{internship.titel}</p>
                      </div>
                    )}
                    {internship.kwalificatie_crebocode && (
                      <div>
                        <span className="text-sm text-slate-500">CREBO code</span>
                        <p className="text-slate-900 font-medium">{internship.kwalificatie_crebocode}</p>
                      </div>
                    )}
                    {internship.study_description && (
                      <div>
                        <span className="text-sm text-slate-500">Beschrijving</span>
                        <p className="text-slate-700">{internship.study_description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                <CardHeader>
                  <CardTitle>Stage details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dates */}
                  {(internship.startdatum || internship.einddatum) && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">Periode</span>
                        <p className="text-slate-900">
                          {formatDate(internship.startdatum) || 'Flexibel'}
                          {internship.einddatum && ` - ${formatDate(internship.einddatum)}`}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Days per week */}
                  {internship.dagen_per_week && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">Dagen per week</span>
                        <p className="text-slate-900">{internship.dagen_per_week}</p>
                      </div>
                    </div>
                  )}

                  {/* Number of positions */}
                  {internship.aantal && internship.aantal > 0 && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">Beschikbare plekken</span>
                        <p className="text-slate-900">{internship.aantal} {internship.aantal === 1 ? 'plek' : 'plekken'}</p>
                      </div>
                    </div>
                  )}

                  {/* Company Size */}
                  {internship.organisatie_grootte && (
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">Bedrijfsgrootte</span>
                        <p className="text-slate-900">{internship.organisatie_grootte}</p>
                      </div>
                    </div>
                  )}

                  {/* SBB Leerbedrijf Registration */}
                  {internship.organisatie_leerbedrijf_id && (
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">SBB Erkend leerbedrijf</span>
                        <p className="text-slate-900 font-mono text-sm">{internship.organisatie_leerbedrijf_id}</p>
                      </div>
                    </div>
                  )}

                  {/* Address */}
                  {getFullAddress() && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-sm text-slate-500">Locatie</span>
                        <p className="text-slate-900">{getFullAddress()}</p>
                        {internship.adres_lat && internship.adres_lon && (
                          <a
                            href={`https://www.google.com/maps?q=${internship.adres_lat},${internship.adres_lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-teal-600 hover:text-teal-700 inline-flex items-center gap-1 mt-1"
                          >
                            Bekijk op kaart
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="bg-white/90 backdrop-blur border-slate-200/50">
                <CardHeader>
                  <CardTitle>Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {internship.contactpersoon && (
                    <div>
                      <span className="text-sm text-slate-500">Contactpersoon</span>
                      <p className="text-slate-900 font-medium">{internship.contactpersoon}</p>
                    </div>
                  )}

                  {(internship.emailadres || internship.organisatie_email) && (
                    <a
                      href={`mailto:${internship.emailadres || internship.organisatie_email}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                    >
                      <Mail className="h-5 w-5 text-teal-600" />
                      <span className="text-slate-700 group-hover:text-slate-900 truncate">
                        {internship.emailadres || internship.organisatie_email}
                      </span>
                    </a>
                  )}

                  {(internship.telefoon || internship.organisatie_telefoon) && (
                    <a
                      href={`tel:${internship.telefoon || internship.organisatie_telefoon}`}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                    >
                      <Phone className="h-5 w-5 text-teal-600" />
                      <span className="text-slate-700 group-hover:text-slate-900">
                        {internship.telefoon || internship.organisatie_telefoon}
                      </span>
                    </a>
                  )}

                  {(internship.website || internship.organisatie_website) && (
                    <a
                      href={internship.website || internship.organisatie_website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                    >
                      <Globe className="h-5 w-5 text-teal-600" />
                      <span className="text-slate-700 group-hover:text-slate-900 truncate">
                        Website bekijken
                      </span>
                      <ExternalLink className="h-4 w-4 text-slate-400 ml-auto shrink-0" />
                    </a>
                  )}
                </CardContent>
              </Card>

              {/* Apply Button */}
              {(internship.emailadres || internship.organisatie_email) && (
                <a
                  href={`mailto:${internship.emailadres || internship.organisatie_email}?subject=Sollicitatie: ${internship.wervende_titel || internship.titel || 'Stage'}`}
                  className="block w-full py-4 px-6 bg-teal-500 hover:bg-teal-600 text-white text-center font-semibold rounded-xl transition-colors shadow-lg shadow-teal-500/25"
                >
                  Solliciteer nu
                </a>
              )}

              {/* Last Updated */}
              {internship.gewijzigd_datum && (
                <p className="text-sm text-slate-500 text-center">
                  Laatst bijgewerkt: {formatDate(internship.gewijzigd_datum)}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 sm:px-8 py-8 text-center text-slate-600 text-sm">
        © 2026 easystage.nl • Alle rechten voorbehouden
      </footer>
    </div>
  );
}
