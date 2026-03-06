export type Lang = 'pt' | 'en';

export const translations: Record<Lang, Record<string, string>> = {
	pt: {
		// Lang toggle
		'lang.toggle': 'EN',
		'lang.switchTo': 'Switch to English',

		// Site
		'site.description':
			'Espaço de diálogo sobre a Avaliação Estratégica para a definição das prioridades nacionais de investigação e inovação no âmbito da criação da AI².',

		// Header
		'header.participate': 'Participe no Diálogo',

		// Nav
		'nav.reports': 'Relatórios',
		'nav.participationStrategy': 'Estratégia de Participação',
		'nav.publicParticipation': 'Participação Pública',
		'nav.publicParticipationMethodology': 'Metodologia de Participação Pública',
		'nav.advisoryCommittee': 'Comissão de Acompanhamento',
		'nav.stakeholderMeetings': 'Reuniões com Entidades',
		'nav.thematicTables': 'Mesas Temáticas',
		'nav.decentralizedWorkshops': 'Workshops Descentralizados',
		'nav.bottomUpInitiatives': 'Iniciativas Bottom-up',
		'nav.whatIsIt': 'O que é',
		'nav.st4sMethodology': 'Metodologia ST4S',
		'nav.strategicAssessmentMethodology': 'Metodologia de Avaliação Estratégica da AI²',
		'nav.nationalLegislation': 'Legislação Nacional',
		'nav.aboutTeam': 'Sobre a Equipa',
		'nav.coordination': 'Coordenação',
		'nav.expertTeam': 'Equipa de Peritos',
		'nav.reports.presentations': 'Apresentação Pública',
		'nav.reports.methodologicalReport': 'Relatório Metodologia',
		'nav.toggleMenu': 'Alternar Menu',

		// Footer
		'footer.description':
		'Espaço de diálogo sobre a Avaliação Estratégica para a definição das prioridades nacionais de investigação e inovação no âmbito da criação da AI².',
		'footer.contactPrompt': 'Dúvidas ou sugestões?',
		'footer.contactLink': 'Contacte-nos',
		'footer.logoAltPlanapp': 'Logo PLANAPP',
		'footer.logoAltGov': 'Logo Governo da República Portuguesa',
		'footer.participationStrategy': 'Estratégia de Participação',
		'footer.whatIsIt': 'O que é',
		'footer.aboutTeam': 'Sobre a Equipa',
		'footer.copyright':
			'© 2026 PLANAPP. Processo promovido pelo Ministério da Educação, Ciência e Inovação. Todos os direitos reservados.',
		'footer.backToTop': 'Voltar ao topo ↑',

		// Home
		'home.imgAlt': 'AI² - Agência para a Investigação e Inovação',
		'home.heading':
			'Espaço de diálogo sobre as prioridades nacionais de investigação e inovação no âmbito da criação da AI²',
		'home.participateBtn': 'Participe no Diálogo',
		'home.ctaText':
			'A sua participação é essencial para definir o futuro da investigação e da inovação em Portugal. Participe no espaço de diálogo e contribua para o desenvolvimento científico e tecnológico do país.',
		'home.ctaBtn': 'Participar no Diálogo',

		// Page titles
		'page.publicPresentation.title': 'Apresentação Pública',
		'page.publicParticipation.title': 'Participação Pública',
		'page.publicParticipationMethodology.title': 'Metodologia de Participação Pública',
		'page.advisoryCommittee.title': 'Comissão de Acompanhamento',
		'page.stakeholderMeetings.title': 'Reuniões com Entidades',
		'page.thematicTables.title': 'Mesas Temáticas',
		'page.decentralizedWorkshops.title': 'Workshops Descentralizados',
		'page.bottomUpInitiatives.title': 'Iniciativas Bottom-up',
		'page.reports.title': 'Relatórios',
		'page.st4sMethodology.title': 'Metodologia ST4S',
		'page.strategicAssessmentMethodology.title': 'Metodologia de Avaliação Estratégica da AI²',
		'page.nationalLegislation.title': 'Legislação Nacional',
		'page.coordination.title': 'Coordenação',
		'page.expertTeam.title': 'Equipa de Peritos',

		// Advisory Committee page
		'page.advisoryCommittee.members': 'Membros da Comissão',
		'page.advisoryCommittee.missionFunctions': 'Missão e Funções',
		'page.advisoryCommittee.interaction': 'Interação com outros atores',

		// Coordination page
		'page.coordination.scientificCoordination': 'Coordenação Científica',
		'page.coordination.institutionalCoordination': 'Coordenação Institucional',
		'page.coordination.scientificRole': 'Coordenação Científica da Metodologia ST4S',
		'page.coordination.institutionalRole': 'Coordenação global',

		// Strategic Assessment Methodology page
		'page.strategicAssessment.anchors': 'Âncoras estratégicas',
		'page.strategicAssessment.phases': 'Fases da Avaliação Estratégica',
		'page.strategicAssessment.participation': 'Participação ativa',
		'page.strategicAssessment.viewDoc': 'Ver Documento de Metodologia de Avaliação',

		// ST4S Methodology page
		'page.st4s.threePhases': 'As três fases da metodologia ST4S',

		// Expert Team page
		'page.expertTeam.photoAlt': 'Foto de',
		'page.expertTeam.role.coordinator': 'coordenador',
		'page.expertTeam.role.coordinatorf': 'coordenadora',

		// Expert Team section titles
		'expertTeam.s1': 'Desafios societais e necessidades de investigação e inovação',
		'expertTeam.s2': 'Governança e ecossistema de investigação e inovação',
		'expertTeam.s3': 'Modelo e fontes de financiamento',
		'expertTeam.s4': 'Relação entre investigação e inovação',
		'expertTeam.s5': 'Áreas de I&D',
		'expertTeam.s6': 'Infraestruturas e emprego científico e tecnológico'
	},

	en: {
		// Lang toggle
		'lang.toggle': 'PT',
		'lang.switchTo': 'Mudar para Português',

		// Site
		'site.description':
			'Dialogue space on the Strategic Assessment for defining national research and innovation priorities in the context of creating AI².',

		// Header
		'header.participate': 'Participate in the Dialogue',

		// Nav
		'nav.reports': 'Reports',
		'nav.participationStrategy': 'Participation Strategy',
		'nav.publicParticipation': 'Public Participation',
		'nav.publicParticipationMethodology': 'Public Participation Methodology',
		'nav.advisoryCommittee': 'Advisory Committee',
		'nav.stakeholderMeetings': 'Targeted Stakeholder Meetings',
		'nav.thematicTables': 'Thematic Roundtables',
		'nav.decentralizedWorkshops': 'Decentralised Workshops',
		'nav.bottomUpInitiatives': 'Bottom-up Initiatives',
		'nav.whatIsIt': 'What it is',
		'nav.st4sMethodology': 'ST4S Methodology',
		'nav.strategicAssessmentMethodology': 'AI² Strategic Assessment Methodology',
		'nav.nationalLegislation': 'National Legislation',
		'nav.aboutTeam': 'About the Team',
		'nav.coordination': 'Coordination',
		'nav.expertTeam': 'Expert Team',
		'nav.reports.presentations': 'Public Presentation',
		'nav.reports.methodologicalReport': 'Methodological Report',
		'nav.toggleMenu': 'Toggle Menu',

		// Footer
		'footer.description':
		'Dialogue space on the Strategic Assessment for defining national research and innovation priorities in the context of creating AI².',
		'footer.contactPrompt': 'Questions or suggestions?',
		'footer.contactLink': 'Contact us',
		'footer.logoAltPlanapp': 'PLANAPP Logo',
		'footer.logoAltGov': 'Logo of the Portuguese Republic Government',
		'footer.participationStrategy': 'Participation Strategy',
		'footer.whatIsIt': 'What it is',
		'footer.aboutTeam': 'About the Team',
		'footer.copyright':
			'© 2026 PLANAPP. Process promoted by the Ministry of Education, Science and Innovation. All rights reserved.',
		'footer.backToTop': 'Back to top ↑',

		// Home
		'home.imgAlt': 'AI² - Agency for Research and Innovation',
		'home.heading':
			'Dialogue space on the national research and innovation priorities in the context of creating AI²',
		'home.participateBtn': 'Participate in the Dialogue',
		'home.ctaText':
			"Your participation is essential to define the future of research and innovation in Portugal. Participate in the dialogue space and contribute to the country's scientific and technological development.",
		'home.ctaBtn': 'Join the Dialogue',

		// Page titles
		'page.publicPresentation.title': 'Public Presentation',
		'page.publicParticipation.title': 'Public Participation',
		'page.publicParticipationMethodology.title': 'Public Participation Methodology',
		'page.advisoryCommittee.title': 'Advisory Committee',
		'page.stakeholderMeetings.title': 'Targeted Stakeholder Meetings',
		'page.thematicTables.title': 'Thematic Roundtables',
		'page.decentralizedWorkshops.title': 'Decentralised Workshops',
		'page.bottomUpInitiatives.title': 'Bottom-up Initiatives',
		'page.reports.title': 'Reports',
		'page.st4sMethodology.title': 'ST4S Methodology',
		'page.strategicAssessmentMethodology.title': 'AI² Strategic Assessment Methodology',
		'page.nationalLegislation.title': 'National Legislation',
		'page.coordination.title': 'Coordination',
		'page.expertTeam.title': 'Expert Team',

		// Advisory Committee page
		'page.advisoryCommittee.members': 'Committee Members',
		'page.advisoryCommittee.missionFunctions': 'Mission and Functions',
		'page.advisoryCommittee.interaction': 'Interaction with other stakeholders',

		// Coordination page
		'page.coordination.scientificCoordination': 'Scientific Coordination',
		'page.coordination.institutionalCoordination': 'Institutional Coordination',
		'page.coordination.scientificRole': 'Scientific Coordination of the ST4S Methodology',
		'page.coordination.institutionalRole': 'Overall coordination',

		// Strategic Assessment Methodology page
		'page.strategicAssessment.anchors': 'Strategic Anchors',
		'page.strategicAssessment.phases': 'Strategic Assessment Phases',
		'page.strategicAssessment.participation': 'Active Participation',
		'page.strategicAssessment.viewDoc': 'View Strategic Assessment Methodology Document',

		// ST4S Methodology page
		'page.st4s.threePhases': 'The three phases of the ST4S methodology',

		// Expert Team page
		'page.expertTeam.photoAlt': 'Photo of',
		'page.expertTeam.role.coordinator': 'coordinator',
		'page.expertTeam.role.coordinatorf': 'coordinator',

		// Expert Team section titles
		'expertTeam.s1': 'Societal challenges and research and innovation needs',
		'expertTeam.s2': 'Governance and research and innovation ecosystem',
		'expertTeam.s3': 'Funding model and sources',
		'expertTeam.s4': 'Relationship between research and innovation',
		'expertTeam.s5': 'R&D Areas',
		'expertTeam.s6': 'Scientific and technological infrastructures and employment'
	}
};
