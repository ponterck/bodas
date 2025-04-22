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

    const tableHeaders = ['ID', 'Nombre', 'Usuario', 'Empresas', 'Plantillas', 'Creado en', 'Activo'];

    const tableBody = [
      tableHeaders,
      ...data.map(item => {
        console.log('Item:', item);
    
        const companyNames = item.companies?.map(company => {
          // Asegúrate de qué campos tiene cada empresa
          return company.item1 ? `${company.item1} - ${company.item2}` : company.name || '-';
        }).join(', ') || '-';
        const templatecompanyNames =
        item?.companies
        ?.map((company) => {
          const hasRoleTemplateNames = Array.isArray(company.roleTemplateNames) && company.roleTemplateNames.length > 0;
          const hasIndividualClaims = Array.isArray(company.individualClaims) && company.individualClaims.length > 0;
      
          if (hasIndividualClaims && company.individualClaims.length > 1628) {
            return "Rol Administrador";
          }
      
          if (hasRoleTemplateNames) {
            return company.roleTemplateNames.join(", ");
          }
      
          if (hasIndividualClaims) {
            return "Perfil Personalizado";
          }
      
          return "No cuenta con permisos";
        })
        .join(" / ") || "No cuenta con permisos";
        return [
          item.id || '-',                 // Puede que no todos tengan este campo
          item.fullName || '-',
          item.userName || '-',
          companyNames,
          templatecompanyNames,
          new Date(item.createdAt).toLocaleString(),
          item.isActive ? 'Sí' : 'No',
        ];
      })
    ];
    

    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 60, 40, 60],
      content: [
        { text: 'Reporte de Usuarios test', style: 'header' },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
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
