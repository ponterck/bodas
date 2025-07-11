import React, { useRef } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import fotouno from '@/Asset/lupita/1.png';
import fotodos from '@/Asset/lupita/2.png';
import fototres from '@/Asset/lupita/3.png';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const captureRef = useRef(null);
  const handleDownloadPdf = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('captura.pdf');
  };
  return (
    <>
      <div className="flex flex-col h-screen bg-white text-purple-600">
      <button onClick={handleDownloadPdf}>
            Descargar
          </button>
        <main
          className="flex-grow flex justify-center items-center "
          style={{
            background: 'linear-gradient(to bottom, #a46ff9, #ffffff)',
          }}
        >

          <div ref={captureRef} className="relative w-full max-w-4xl">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Primer Item */}
                <CarouselItem className="p-5 ">
                  <div className="flex flex-col items-center justify-center max-w-full  bg-black bg-opacity-50 p-2 rounded-lg border">
                    <Image
                      className="w-full object-cover"
                      src={fotouno}
                      alt="fotouno"
                      layout="responsive"
                      priority
                    />
                  </div>
                </CarouselItem>

                {/* Segundo Item */}
                <CarouselItem className="p-5">
                  <div className="relative flex flex-col items-center justify-center max-w-full bg-yellow-100 bg-opacity-50 p-2 rounded-lg border">
                    <Image
                      className="w-full object-cover"
                      src={fotodos}
                      alt="fotodos"
                      layout="responsive"
                      priority
                    />

                    <div className="absolute inset-0 flex items-end justify-end bg-opacity-50">
                      <div className="absolute bottom-0 left-0 w-full bg-opacity-50 flex flex-col items-center justify-start h-[40%] px-4">
                        <Link href='https://maps.app.goo.gl/acwNcjczUBkrt5wPA' className="text-black text-xs sm:text-base md:text-lg underline mt-3">
                          Ubicación de la Parroquia - Horario misa:  12:00
                        </Link>
                        <Link href='https://maps.app.goo.gl/ANZJ6hUrXoUfuDKTA' className="text-black text-xs sm:text-base md:text-lg  underline mt-3">
                          Ubicación del salón - Horario fiesta: 2:00
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Tercer Item */}
                <CarouselItem className="p-5">
                  <div className="flex flex-col items-center justify-center max-w-full  bg-black bg-opacity-50 p-2 rounded-lg border">
                    <Image
                      className="w-full object-cover"
                      src={fototres}
                      alt="fototres"
                      layout="responsive"
                      priority
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Botones de Navegación */}
              <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full sm:left-1" />
              <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full sm:right-1" />
            </Carousel>
          </div>

        </main>
      </div>
    </>
  );
}
