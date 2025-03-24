'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Medicines', [
      // Cardiologist Medicines
      {
        name: 'Aspirin',
        manufacturedBy: 'Bayer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Atorvastatin',
        manufacturedBy: 'Pfizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clopidogrel',
        manufacturedBy: 'Sanofi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Dermatologist Medicines
      {
        name: 'Isotretinoin',
        manufacturedBy: 'Cipla',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hydrocortisone',
        manufacturedBy: 'GlaxoSmithKline',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ketoconazole',
        manufacturedBy: 'Sun Pharma',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Neurologist Medicines
      {
        name: 'Levetiracetam',
        manufacturedBy: 'Dr. Reddy’s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gabapentin',
        manufacturedBy: 'Pfizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Donepezil',
        manufacturedBy: 'Eisai Co.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Gastroenterology Medicines
      {
        name: 'Omeprazole',
        manufacturedBy: 'AstraZeneca',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ranitidine',
        manufacturedBy: 'GlaxoSmithKline',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Loperamide',
        manufacturedBy: 'Johnson & Johnson',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Orthopedic Medicines
      {
        name: 'Diclofenac',
        manufacturedBy: 'Sun Pharma',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Naproxen',
        manufacturedBy: 'Dr. Reddy’s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alendronate',
        manufacturedBy: 'Merck',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Pediatrician Medicines
      {
        name: 'Amoxicillin',
        manufacturedBy: 'GlaxoSmithKline',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Paracetamol (Syrup)',
        manufacturedBy: 'Cipla',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ibuprofen (Syrup)',
        manufacturedBy: 'Pfizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Nephrology Medicines
      {
        name: 'Furosemide',
        manufacturedBy: 'Sanofi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Spironolactone',
        manufacturedBy: 'Dr. Reddy’s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Erythropoietin',
        manufacturedBy: 'Roche',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Psychologist Medicines
      {
        name: 'Fluoxetine',
        manufacturedBy: 'Eli Lilly',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sertraline',
        manufacturedBy: 'Pfizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Clonazepam',
        manufacturedBy: 'Roche',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Pulmonology Medicines
      {
        name: 'Salbutamol',
        manufacturedBy: 'GlaxoSmithKline',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Budesonide',
        manufacturedBy: 'AstraZeneca',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Montelukast',
        manufacturedBy: 'Cipla',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Rheumatology Medicines
      {
        name: 'Methotrexate',
        manufacturedBy: 'Pfizer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hydroxychloroquine',
        manufacturedBy: 'Sanofi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sulfasalazine',
        manufacturedBy: 'Dr. Reddy’s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Urology Medicines
      {
        name: 'Tamsulosin',
        manufacturedBy: 'Boehringer Ingelheim',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Finasteride',
        manufacturedBy: 'Merck',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dutasteride',
        manufacturedBy: 'GlaxoSmithKline',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Medicines', null, {});
  },
};