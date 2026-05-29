<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    protected $model = Service::class;

    // عداد باش يدوز على الخدمات كاملين بلا ما يتعاودو
    protected static int $index = 0;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        // الخدمات الحقيقية المأخوذة من التجهيزات المذكورة في ملفاتك مع أيقونات مناسبة
        $servicesData = [
            ['nom_service' => 'Wi-Fi gratuit', 'icon' => 'fas fa-wifi'],
            ['nom_service' => 'Climatisation indépendante', 'icon' => 'fas fa-snowflake'],
            ['nom_service' => 'Télévision écran plat', 'icon' => 'fas fa-tv'],
            ['nom_service' => 'Coffre-fort gratuit', 'icon' => 'fas fa-key'],
            ['nom_service' => 'Minibar', 'icon' => 'fas fa-utensils'],
            ['nom_service' => 'Plateau de courtoisie (Bouilloire, Thé, Café)', 'icon' => 'fas fa-coffee'],
            ['nom_service' => 'Bouteille d’eau offerte à l’arrivée', 'icon' => 'fas fa-tint'],
            ['nom_service' => 'Sèche-cheveux', 'icon' => 'fas fa-wind'],
            ['nom_service' => 'Bureau de travail', 'icon' => 'fas fa-laptop'],
            ['nom_service' => 'Grande terrasse meublée', 'icon' => 'fas fa-umbrella-beach'],
            ['nom_service' => 'Vue sur Rabat', 'icon' => 'fas fa-city'],
        ];

        // نأخذ الخدمة الحالية على حسب العداد
        $current = $servicesData[self::$index % count($servicesData)];
        self::$index++;

        return [
            'nom_service' => $current['nom_service'],
            'icon' => $current['icon'],
        ];
    }
}
