import React, { useEffect, useState } from 'react';
import data from '@/data/data';

const FormularioConValidacion = () => {
  const [pdfMake, setPdfMake] = useState(null);

  useEffect(() => {
    const loadPdfMake = async () => {
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfFonts = await import("pdfmake/build/vfs_fonts");
      pdfMakeModule.vfs = pdfFonts.vfs;
      setPdfMake(pdfMakeModule);
    };
    loadPdfMake();
  }, []);

  const handleDownload = () => {
    if (!pdfMake) return;

    const tableHeaders = ['ID', 'Nombre', 'Descripción', 'Activo', 'Rol por defecto', 'Creado en', 'Empresas'];

    const tableBody = [
      tableHeaders,
      ...data.map(item => ([
        item.roleTemplateId,
        item.roleTemplateName,
        item.description || '-',
        item.active ? 'Sí' : 'No',
        item.defaultRole ? 'Sí' : 'No',
        new Date(item.createdAt).toLocaleString(),
        item.companies.map(c => `${c.item1} - ${c.item2}`).join(', ')
      ]))
    ];

    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      content: [
        { text: 'Reporte de Roles (sin claims)', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto', 'auto', 'auto', '*'],
            body: tableBody
          },
          layout: {
            fillColor: function (rowIndex) {
              return rowIndex === 0 ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        tableExample: {
          fontSize: 9,
          margin: [0, 5, 0, 15]
        }
      }
    };
    

    pdfMake.createPdf(docDefinition).download('reporte_roles.pdf');
  };

  return (
    <>
      <button
        style={{ padding: 10, width: 250, background: '#3C98CB', color: '#fff', border: 'none', borderRadius: 5 }}
        onClick={handleDownload}
        disabled={!pdfMake}
      >
        Descargar PDF
      </button>
    </>
  );
};

export default FormularioConValidacion;
