import { i18n } from '@tager/admin-services';

import EN from './locales/en';
import RU from './locales/ru';

i18n.addTranslations('en', 'files', EN);
i18n.addTranslations('ru', 'files', RU);

export * from './constants/routes';
export * from './utils/paths';
export * from './services/requests';
