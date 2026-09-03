import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Novedad {
  id: number;
  category: 'concursos' | 'eventos' | 'academico';
  title: string;
  categoryName: string;
  date: string;
  summary: string;
  fullContent: string;
  image: string;
  badgeColor: string;
}

export interface Sede {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  hours: string;
  levels: string[];
  features: string[];
  image: string;
  mapQuery: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Current year for footer
  readonly currentYear = new Date().getFullYear();

  // Navigation & UI state
  readonly isMobileMenuOpen = signal<boolean>(false);
  readonly isVideoMuted = signal<boolean>(true);
  readonly isVideoPlaying = signal<boolean>(true);
  readonly isVideoModalOpen = signal<boolean>(false);

  // Filter signals
  readonly activeNewsCategory = signal<'todas' | 'concursos' | 'eventos' | 'academico'>('todas');
  readonly selectedNovedad = signal<Novedad | null>(null);

  // Selection signals
  readonly activeSedeId = signal<string>('central');
  readonly activeNivelId = signal<'inicial' | 'primaria' | 'secundaria'>('primaria');

  // Form signals
  readonly contactForm = signal({
    fullName: '',
    phone: '',
    email: '',
    sede: 'central',
    nivel: 'primaria',
    message: ''
  });
  readonly formSubmitted = signal<boolean>(false);

  // Novedades list
  readonly novedades = signal<Novedad[]>([
    {
      id: 1,
      category: 'concursos',
      categoryName: 'Concurso de Excelencia',
      title: 'Ganadores del Concurso Nacional 2026',
      date: '15 de Agosto, 2026',
      summary: 'Nuestros estudiantes lograron los primeros puestos y medallas de oro en las categorías de primaria y secundaria a nivel regional.',
      fullContent: 'El certamen académico reunió a más de 500 alumnos de las mejores instituciones educativas. El equipo de Colegios D\' UNI obtuvo el primer lugar institucional en cálculo, razonamiento lógico y resolución de problemas avanzados. Felicitamos a nuestros talentosos estudiantes y docentes asesores.',
      image: 'assets/novedades/campeon-2026.jpeg',
      badgeColor: 'bg-red-600 text-white'
    },
    {
      id: 2,
      category: 'eventos',
      categoryName: 'Ingresantes UNCP 2026',
      title: 'Nuestros alumnos ingresantes a la UNCP 2026',
      date: '22 de Agosto, 2026',
      summary: 'El primer nivel de exigencia inicia en casa y tiene su culminación en la Universidad Nacional del Centro del Perú.',
      fullContent: 'Desde el área de producción y asesoría académica, nuestros exalumnos de los niveles de primaria y secundaria lograron sus ingresos a la UNCP. Los resultados obtenidos reflejan el compromiso, disciplina y alto nivel de preparación que reciben nuestros estudiantes.',
      image: 'assets/novedades/ingresante-uncp.jpeg',
      badgeColor: 'bg-amber-600 text-white'
    },
    {
      id: 3,
      category: 'academico',
      categoryName: 'Deporte',
      title: 'Nuestros alumnos destacaron en los juegos deportivos 2026',
      date: '28 de Agosto, 2026',
      summary: 'Selección de futsal y vóley alcanzó el primer lugar en la Copa Interdistrital.',
      fullContent: 'Los equipos de futsal y vóley de secundaria demostraron gran destreza y espíritu deportivo, obteniendo el campeonato en sus respectivas categorías. Los encuentros se realizaron en el Polideportivo de Chilca, donde nuestros alumnos compitieron con dedication y lograron importantes victorias.',
      image: 'assets/novedades/premio-deportes.jpeg',
      badgeColor: 'bg-emerald-600 text-white'
    }
  ]);

  // Computed filtered novedades
  readonly filteredNovedades = computed(() => {
    const category = this.activeNewsCategory();
    if (category === 'todas') {
      return this.novedades();
    }
    return this.novedades().filter(n => n.category === category);
  });

  // 3 Sedes List
  readonly sedes = signal<Sede[]>([
    {
      id: 'la punta',
      name: 'Sede La Punta',
      subtitle: 'Campus Innovación & Desarrollo Integral',
      address: 'Av. Mariscal Castilla 1230, La Punta',
      phone: '(064) 248-910 / +51 976 543 210',
      hours: 'Lun - Vie: 7:30 AM - 5:00 PM',
      levels: ['Inicial', 'Primaria'],
      features: ['Zona de Psicomotricidad Equipada', 'Área Verde y Huerto Ecológico', 'Taller de Arte, Danza y Música', 'Campo Deportivo con Césped Sintético'],
      image: 'assets/sedes/sede-punta.jpeg',
      mapQuery: 'Av Mariscal Castilla La Punta Huancayo'
    },
    {
      id: 'huancayo',
      name: 'Sede Huancayo',
      subtitle: 'Campus Principal & Alta Exigencia Académica',
      address: 'Av. Giráldez 450, Huancayo (Frente al Parque Constitución)',
      phone: '(064) 251-480 / +51 984 123 456',
      hours: 'Lun - Vie: 7:30 AM - 5:30 PM',
      levels: ['Inicial', 'Primaria', 'Secundaria'],
      features: ['Aulas Digitales e Interactivas', 'Laboratorio de Ciencias Avanzado', 'Biblioteca y Sala de Cómputo', 'Auditorio Institucional'],
      image: 'assets/sedes/sede-central.jpg',
      mapQuery: 'Av Giraldez 450 Huancayo'
    },
    {
      id: 'chilca',
      name: 'Sede Chilca',
      subtitle: 'Complejo Deportivo & Preparación Pre-UNI',
      address: 'Av. 9 de Diciembre 780, Chilca',
      phone: '(064) 213-750 / +51 955 888 777',
      hours: 'Lun - Vie: 7:30 AM - 6:00 PM',
      levels: ['Primaria', 'Secundaria Pre-Universitaria'],
      features: ['Polideportivo Multiusos Techado', 'Laboratorio de Robótica y Programación', 'Centro de Simulacros de Admisión', 'Talleres de Liderazgo y Oratoria'],
      image: 'assets/sedes/sede-chilca.jpg',
      mapQuery: 'Av 9 de Diciembre Chilca Huancayo'
    }
  ]);

  readonly activeSede = computed(() => {
    return this.sedes().find(s => s.id === this.activeSedeId()) || this.sedes()[0];
  });

  // Action Methods
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleSound(videoElement: HTMLVideoElement): void {
    const nextState = !this.isVideoMuted();
    this.isVideoMuted.set(nextState);
    videoElement.muted = nextState;
  }

  togglePlayPause(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      videoElement.play();
      this.isVideoPlaying.set(true);
    } else {
      videoElement.pause();
      this.isVideoPlaying.set(false);
    }
  }

  openVideoModal(): void {
    this.isVideoModalOpen.set(true);
  }

  closeVideoModal(): void {
    this.isVideoModalOpen.set(false);
  }

  openNovedadModal(item: Novedad): void {
    this.selectedNovedad.set(item);
  }

  closeNovedadModal(): void {
    this.selectedNovedad.set(null);
  }

  submitContactForm(event: Event): void {
    event.preventDefault();
    this.formSubmitted.set(true);
    setTimeout(() => {
      this.formSubmitted.set(false);
      this.contactForm.set({
        fullName: '',
        phone: '',
        email: '',
        sede: 'central',
        nivel: 'primaria',
        message: ''
      });
    }, 5000);
  }

  getWhatsAppLink(): string {
    const phone = '51984123456';
    const text = encodeURIComponent("¡Hola Colegios D' UNI! Deseo solicitar más información sobre vacantes y admisión 2027.");
    return `https://wa.me/${phone}?text=${text}`;
  }
}
