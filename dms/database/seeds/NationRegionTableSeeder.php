<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class NationRegionTableSeeder extends Seeder
{

    public function run()
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        $countries = array(
            array('id' => 1, 'code' => 'ad', 'name' => 'Andorra', 'region_id' => '3'),
            array('id' => 2, 'code' => 'ae', 'name' => 'United Arab Emirates', 'region_id' => '5'),
            array('id' => 3, 'code' => 'af', 'name' => 'Afghanistan', 'region_id' => '5'),
            array('id' => 4, 'code' => 'ag', 'name' => 'Antigua and Barbuda', 'region_id' => '4'),
            array('id' => 5, 'code' => 'ai', 'name' => 'Anguilla(UK)', 'region_id' => '4'),
            array('id' => 6, 'code' => 'al', 'name' => 'Albania', 'region_id' => '3'),
            array('id' => 7, 'code' => 'am', 'name' => 'Armenia', 'region_id' => '3'),
            array('id' => 8, 'code' => 'an', 'name' => 'Netherlands Antilles', 'region_id' => '3'),
            array('id' => 9, 'code' => 'ao', 'name' => 'Angola', 'region_id' => '5'),
            array('id' => 10, 'code' => 'ar', 'name' => 'Argentina', 'region_id' => '4'),
            array('id' => 11, 'code' => 'as', 'name' => 'American Samoa(US)', 'region_id' => '5'),
            array('id' => 12, 'code' => 'at', 'name' => 'Austria', 'region_id' => '3'),
            array('id' => 13, 'code' => 'au', 'name' => 'Australia', 'region_id' => '5'),
            array('id' => 14, 'code' => 'aw', 'name' => 'Aruba(Kingdom of the Netherlands)', 'region_id' => '4'),
            array('id' => 15, 'code' => 'az', 'name' => 'Azerbaijan', 'region_id' => '3'),
            array('id' => 16, 'code' => 'ba', 'name' => 'Bosnia and Herzegovina', 'region_id' => '3'),
            array('id' => 17, 'code' => 'bb', 'name' => 'Barbados', 'region_id' => '4'),
            array('id' => 18, 'code' => 'bd', 'name' => 'Bangladesh', 'region_id' => '5'),
            array('id' => 19, 'code' => 'be', 'name' => 'Belgium', 'region_id' => '3'),
            array('id' => 20, 'code' => 'bf', 'name' => 'Burkina Faso', 'region_id' => '5'),
            array('id' => 21, 'code' => 'bg', 'name' => 'Bulgaria', 'region_id' => '3'),
            array('id' => 22, 'code' => 'bh', 'name' => 'Bahrain', 'region_id' => '5'),
            array('id' => 23, 'code' => 'bi', 'name' => 'Burundi', 'region_id' => '5'),
            array('id' => 24, 'code' => 'bj', 'name' => 'Benin', 'region_id' => '5'),
            array('id' => 25, 'code' => 'bm', 'name' => 'Bermuda(UK)', 'region_id' => '4'),
            array('id' => 26, 'code' => 'bn', 'name' => 'Brunei', 'region_id' => '5'),
            array('id' => 27, 'code' => 'bo', 'name' => 'Bolivia', 'region_id' => '4'),
            array('id' => 28, 'code' => 'br', 'name' => 'Brazil', 'region_id' => '4'),
            array('id' => 29, 'code' => 'bs', 'name' => 'Bahamas', 'region_id' => '4'),
            array('id' => 30, 'code' => 'bt', 'name' => 'Bhutan', 'region_id' => '5'),
            array('id' => 31, 'code' => 'bv', 'name' => 'Bouvet Island', 'region_id' => '3'),
            array('id' => 32, 'code' => 'bw', 'name' => 'Botswana', 'region_id' => '5'),
            array('id' => 33, 'code' => 'by', 'name' => 'Belarus', 'region_id' => '3'),
            array('id' => 34, 'code' => 'bz', 'name' => 'Belize', 'region_id' => '4'),
            array('id' => 35, 'code' => 'ca', 'name' => 'CANADA', 'region_id' => '1'),
            array('id' => 36, 'code' => 'cc', 'name' => 'Cocos (Keeling) Islands', 'region_id' => '5'),
            array('id' => 37, 'code' => 'cd', 'name' => 'Congo,  The Democratic Republic of The', 'region_id' => '5'),
            array('id' => 38, 'code' => 'cf', 'name' => 'Central African Republic', 'region_id' => '5'),
            array('id' => 39, 'code' => 'cg', 'name' => 'Congo', 'region_id' => '5'),
            array('id' => 40, 'code' => 'ch', 'name' => 'Switzerland', 'region_id' => '3'),
            array('id' => 41, 'code' => 'ci', 'name' => 'Cote Divoire', 'region_id' => '5'),
            array('id' => 42, 'code' => 'ck', 'name' => 'Cook Islands(NZ)', 'region_id' => '5'),
            array('id' => 43, 'code' => 'cl', 'name' => 'Chile', 'region_id' => '4'),
            array('id' => 44, 'code' => 'cm', 'name' => 'Cameroon', 'region_id' => '5'),
            array('id' => 45, 'code' => 'cn', 'name' => 'China,  HK', 'region_id' => '2'),
            array('id' => 46, 'code' => 'co', 'name' => 'Colombia', 'region_id' => '4'),
            array('id' => 47, 'code' => 'cr', 'name' => 'Costa Rica', 'region_id' => '4'),
            array('id' => 48, 'code' => 'cu', 'name' => 'Cuba', 'region_id' => '4'),
            array('id' => 49, 'code' => 'cv', 'name' => 'Cape Verde', 'region_id' => '5'),
            array('id' => 50, 'code' => 'cx', 'name' => 'Christmas Island', 'region_id' => '5'),
            array('id' => 51, 'code' => 'cy', 'name' => 'Cyprus', 'region_id' => '3'),
            array('id' => 52, 'code' => 'cz', 'name' => 'Czech Republic', 'region_id' => '3'),
            array('id' => 53, 'code' => 'de', 'name' => 'Germany', 'region_id' => '3'),
            array('id' => 54, 'code' => 'dj', 'name' => 'Djibouti', 'region_id' => '5'),
            array('id' => 55, 'code' => 'dk', 'name' => 'Denmark', 'region_id' => '3'),
            array('id' => 56, 'code' => 'dm', 'name' => 'Dominica', 'region_id' => '4'),
            array('id' => 57, 'code' => 'do', 'name' => 'Dominican Republic', 'region_id' => '4'),
            array('id' => 58, 'code' => 'dz', 'name' => 'Algeria', 'region_id' => '5'),
            array('id' => 59, 'code' => 'ec', 'name' => 'Ecuador', 'region_id' => '4'),
            array('id' => 60, 'code' => 'ee', 'name' => 'Estonia', 'region_id' => '3'),
            array('id' => 61, 'code' => 'eg', 'name' => 'Egypt', 'region_id' => '5'),
            array('id' => 62, 'code' => 'eh', 'name' => 'Western Sahara', 'region_id' => '5'),
            array('id' => 63, 'code' => 'er', 'name' => 'Eritrea', 'region_id' => '5'),
            array('id' => 64, 'code' => 'es', 'name' => 'Spain', 'region_id' => '3'),
            array('id' => 65, 'code' => 'et', 'name' => 'Ethiopia', 'region_id' => '5'),
            array('id' => 66, 'code' => 'fi', 'name' => 'Finland', 'region_id' => '3'),
            array('id' => 67, 'code' => 'fj', 'name' => 'Fiji', 'region_id' => '5'),
            array('id' => 68, 'code' => 'fk', 'name' => 'Falkland Islands(UK)', 'region_id' => '4'),
            array('id' => 69, 'code' => 'fm', 'name' => 'Federated States of Micronesia', 'region_id' => '5'),
            array('id' => 71, 'code' => 'fo', 'name' => 'Faroe Islands', 'region_id' => '3'),
            array('id' => 72, 'code' => 'fr', 'name' => 'France', 'region_id' => '3'),
            array('id' => 73, 'code' => 'ga', 'name' => 'Gabon', 'region_id' => '5'),
            array('id' => 74, 'code' => 'gb', 'name' => 'United Kingdom', 'region_id' => '3'),
            array('id' => 75, 'code' => 'gd', 'name' => 'Grenada', 'region_id' => '4'),
            array('id' => 76, 'code' => 'ge', 'name' => 'Georgia', 'region_id' => '3'),
            array('id' => 77, 'code' => 'gf', 'name' => 'French Guiana', 'region_id' => '4'),
            array('id' => 78, 'code' => 'gh', 'name' => 'Ghana', 'region_id' => '5'),
            array('id' => 79, 'code' => 'gi', 'name' => 'Gibraltar', 'region_id' => '3'),
            array('id' => 80, 'code' => 'gl', 'name' => 'Greenland(Denmark)', 'region_id' => '4'),
            array('id' => 81, 'code' => 'gm', 'name' => 'Gambia', 'region_id' => '5'),
            array('id' => 83, 'code' => 'gn', 'name' => 'Guinea', 'region_id' => '5'),
            array('id' => 84, 'code' => 'gp', 'name' => 'Guadeloupe(France)', 'region_id' => '4'),
            array('id' => 85, 'code' => 'gq', 'name' => 'Equatorial Guinea', 'region_id' => '5'),
            array('id' => 86, 'code' => 'gr', 'name' => 'Greece', 'region_id' => '3'),
            array('id' => 87, 'code' => 'gs', 'name' => 'South Georgia and The South Sandwich Islands', 'region_id' => '3'),
            array('id' => 88, 'code' => 'gt', 'name' => 'Guatemala', 'region_id' => '4'),
            array('id' => 89, 'code' => 'gu', 'name' => 'Guam(US)', 'region_id' => '5'),
            array('id' => 90, 'code' => 'gw', 'name' => 'Guinea-Bissau', 'region_id' => '5'),
            array('id' => 91, 'code' => 'gy', 'name' => 'Guyana', 'region_id' => '4'),
            array('id' => 92, 'code' => 'hk', 'name' => 'Hong Kong', 'region_id' => '2'),
            array('id' => 93, 'code' => 'hm', 'name' => 'Heard Island and Mcdonald Islands', 'region_id' => '5'),
            array('id' => 94, 'code' => 'hn', 'name' => 'Honduras', 'region_id' => '4'),
            array('id' => 95, 'code' => 'hr', 'name' => 'Croatia', 'region_id' => '3'),
            array('id' => 96, 'code' => 'ht', 'name' => 'Haiti', 'region_id' => '4'),
            array('id' => 97, 'code' => 'hu', 'name' => 'Hungary', 'region_id' => '3'),
            array('id' => 98, 'code' => 'id', 'name' => 'Indonesia', 'region_id' => '5'),
            array('id' => 99, 'code' => 'ie', 'name' => 'Ireland', 'region_id' => '3'),
            array('id' => 100, 'code' => 'il', 'name' => 'Israel', 'region_id' => '5'),
            array('id' => 101, 'code' => 'im', 'name' => 'Isle of Man', 'region_id' => '3'),
            array('id' => 102, 'code' => 'in', 'name' => 'India', 'region_id' => '5'),
            array('id' => 103, 'code' => 'io', 'name' => 'British Indian Ocean Territory', 'region_id' => '3'),
            array('id' => 104, 'code' => 'iq', 'name' => 'Iraq', 'region_id' => '5'),
            array('id' => 105, 'code' => 'ir', 'name' => 'Iran', 'region_id' => '5'),
            array('id' => 106, 'code' => 'is', 'name' => 'Iceland', 'region_id' => '3'),
            array('id' => 107, 'code' => 'it', 'name' => 'Italy', 'region_id' => '3'),
            array('id' => 108, 'code' => 'je', 'name' => 'Jersey', 'region_id' => '3'),
            array('id' => 109, 'code' => 'jm', 'name' => 'Jamaica', 'region_id' => '4'),
            array('id' => 110, 'code' => 'jo', 'name' => 'Jordan', 'region_id' => '5'),
            array('id' => 111, 'code' => 'jp', 'name' => 'Japan', 'region_id' => '5'),
            array('id' => 112, 'code' => 'ke', 'name' => 'Kenya', 'region_id' => '5'),
            array('id' => 113, 'code' => 'kg', 'name' => 'Kyrgyzstan', 'region_id' => '5'),
            array('id' => 114, 'code' => 'kh', 'name' => 'Cambodia', 'region_id' => '5'),
            array('id' => 115, 'code' => 'ki', 'name' => 'Kiribati', 'region_id' => '5'),
            array('id' => 116, 'code' => 'km', 'name' => 'Comoros', 'region_id' => '5'),
            array('id' => 117, 'code' => 'kn', 'name' => 'Saint Kitts and Nevis', 'region_id' => '4'),
            array('id' => 118, 'code' => 'kp', 'name' => 'North Korea', 'region_id' => '5'),
            array('id' => 119, 'code' => 'kr', 'name' => 'South Korea', 'region_id' => '5'),
            array('id' => 120, 'code' => 'kw', 'name' => 'Kuwait', 'region_id' => '5'),
            array('id' => 121, 'code' => 'ky', 'name' => 'Cayman Islands(UK)', 'region_id' => '4'),
            array('id' => 122, 'code' => 'kz', 'name' => 'Kazakhstan', 'region_id' => '5'),
            array('id' => 123, 'code' => 'la', 'name' => 'Lao Peoples Democratic Republic', 'region_id' => '5'),
            array('id' => 124, 'code' => 'lb', 'name' => 'Lebanon', 'region_id' => '5'),
            array('id' => 125, 'code' => 'lc', 'name' => 'Saint Lucia', 'region_id' => '4'),
            array('id' => 126, 'code' => 'li', 'name' => 'Liechtenstein', 'region_id' => '3'),
            array('id' => 127, 'code' => 'lk', 'name' => 'Sri Lanka', 'region_id' => '5'),
            array('id' => 128, 'code' => 'lr', 'name' => 'Liberia', 'region_id' => '5'),
            array('id' => 129, 'code' => 'ls', 'name' => 'Lesotho', 'region_id' => '5'),
            array('id' => 130, 'code' => 'lt', 'name' => 'Lithuania', 'region_id' => '3'),
            array('id' => 131, 'code' => 'lu', 'name' => 'Luxembourg', 'region_id' => '3'),
            array('id' => 132, 'code' => 'lv', 'name' => 'Latvia', 'region_id' => '3'),
            array('id' => 133, 'code' => 'ly', 'name' => 'Libya', 'region_id' => '5'),
            array('id' => 134, 'code' => 'ma', 'name' => 'Morocco', 'region_id' => '5'),
            array('id' => 135, 'code' => 'mc', 'name' => 'Monaco', 'region_id' => '3'),
            array('id' => 136, 'code' => 'md', 'name' => 'Moldova', 'region_id' => '3'),
            array('id' => 137, 'code' => 'me', 'name' => 'Montenegro', 'region_id' => '3'),
            array('id' => 138, 'code' => 'mg', 'name' => 'Madagascar', 'region_id' => '5'),
            array('id' => 139, 'code' => 'mh', 'name' => 'Marshall Islands', 'region_id' => '5'),
            array('id' => 140, 'code' => 'mk', 'name' => 'Macedonia', 'region_id' => '3'),
            array('id' => 141, 'code' => 'ml', 'name' => 'Mali', 'region_id' => '5'),
            array('id' => 142, 'code' => 'mm', 'name' => 'Myanmar', 'region_id' => '5'),
            array('id' => 143, 'code' => 'mo', 'name' => 'Macao', 'region_id' => '2'),
            array('id' => 144, 'code' => 'mp', 'name' => 'Northern Mariana Islands(US)', 'region_id' => '5'),
            array('id' => 145, 'code' => 'mq', 'name' => 'Martinique(France)', 'region_id' => '4'),
            array('id' => 146, 'code' => 'mr', 'name' => 'Mauritania', 'region_id' => '5'),
            array('id' => 147, 'code' => 'ms', 'name' => 'Montserrat(UK)', 'region_id' => '4'),
            array('id' => 148, 'code' => 'mt', 'name' => 'Malta', 'region_id' => '3'),
            array('id' => 149, 'code' => 'mu', 'name' => 'Mauritius', 'region_id' => '5'),
            array('id' => 150, 'code' => 'mv', 'name' => 'Maldives', 'region_id' => '5'),
            array('id' => 151, 'code' => 'mw', 'name' => 'Malawi', 'region_id' => '5'),
            array('id' => 152, 'code' => 'mx', 'name' => 'Mexico', 'region_id' => '4'),
            array('id' => 153, 'code' => 'my', 'name' => 'Malaysia', 'region_id' => '5'),
            array('id' => 154, 'code' => 'mz', 'name' => 'Mozambique', 'region_id' => '5'),
            array('id' => 155, 'code' => 'na', 'name' => 'Namibia', 'region_id' => '5'),
            array('id' => 156, 'code' => 'nc', 'name' => 'New Caledonia(France)', 'region_id' => '5'),
            array('id' => 157, 'code' => 'ne', 'name' => 'Niger', 'region_id' => '5'),
            array('id' => 158, 'code' => 'nf', 'name' => 'Norfolk Island(Australia)', 'region_id' => '5'),
            array('id' => 159, 'code' => 'ng', 'name' => 'Nigeria', 'region_id' => '5'),
            array('id' => 160, 'code' => 'ni', 'name' => 'Nicaragua', 'region_id' => '4'),
            array('id' => 161, 'code' => 'nl', 'name' => 'Netherlands', 'region_id' => '3'),
            array('id' => 162, 'code' => 'no', 'name' => 'Norway', 'region_id' => '3'),
            array('id' => 163, 'code' => 'np', 'name' => 'Nepal', 'region_id' => '5'),
            array('id' => 164, 'code' => 'nr', 'name' => 'Nauru', 'region_id' => '5'),
            array('id' => 165, 'code' => 'nu', 'name' => 'Niue(NZ)', 'region_id' => '5'),
            array('id' => 166, 'code' => 'nz', 'name' => 'New Zealand', 'region_id' => '5'),
            array('id' => 167, 'code' => 'om', 'name' => 'Oman', 'region_id' => '5'),
            array('id' => 168, 'code' => 'pa', 'name' => 'Panama', 'region_id' => '4'),
            array('id' => 169, 'code' => 'pe', 'name' => 'Peru', 'region_id' => '4'),
            array('id' => 170, 'code' => 'pf', 'name' => 'French Polynesia(France)', 'region_id' => '5'),
            array('id' => 171, 'code' => 'pg', 'name' => 'Papua New Guinea', 'region_id' => '5'),
            array('id' => 172, 'code' => 'ph', 'name' => 'Philippines', 'region_id' => '5'),
            array('id' => 173, 'code' => 'pk', 'name' => 'Pakistan', 'region_id' => '5'),
            array('id' => 174, 'code' => 'pl', 'name' => 'Poland', 'region_id' => '3'),
            array('id' => 175, 'code' => 'pm', 'name' => 'Saint Pierre and Miquelon(France)', 'region_id' => '4'),
            array('id' => 176, 'code' => 'pn', 'name' => 'Pitcairn Islands(UK)', 'region_id' => '5'),
            array('id' => 177, 'code' => 'pr', 'name' => 'Puerto Rico(US)', 'region_id' => '4'),
            array('id' => 178, 'code' => 'ps', 'name' => 'Palestinian Territory,  Occupied', 'region_id' => '5'),
            array('id' => 179, 'code' => 'pt', 'name' => 'Portugal', 'region_id' => '3'),
            array('id' => 180, 'code' => 'pw', 'name' => 'Palau', 'region_id' => '5'),
            array('id' => 181, 'code' => 'py', 'name' => 'Paraguay', 'region_id' => '4'),
            array('id' => 182, 'code' => 'qa', 'name' => 'Qatar', 'region_id' => '5'),
            array('id' => 183, 'code' => 're', 'name' => 'Reunion', 'region_id' => '5'),
            array('id' => 184, 'code' => 'ro', 'name' => 'Romania', 'region_id' => '3'),
            array('id' => 185, 'code' => 'rs', 'name' => 'Serbia', 'region_id' => '3'),
            array('id' => 186, 'code' => 'ru', 'name' => 'Russia', 'region_id' => '3'),
            array('id' => 187, 'code' => 'rw', 'name' => 'Rwanda', 'region_id' => '5'),
            array('id' => 188, 'code' => 'sa', 'name' => 'Saudi Arabia', 'region_id' => '5'),
            array('id' => 189, 'code' => 'sb', 'name' => 'Solomon Islands', 'region_id' => '5'),
            array('id' => 190, 'code' => 'sc', 'name' => 'Seychelles', 'region_id' => '5'),
            array('id' => 191, 'code' => 'sd', 'name' => 'Sudan', 'region_id' => '5'),
            array('id' => 192, 'code' => 'se', 'name' => 'Sweden', 'region_id' => '3'),
            array('id' => 193, 'code' => 'sg', 'name' => 'Singapore', 'region_id' => '5'),
            array('id' => 194, 'code' => 'sh', 'name' => 'Saint Helena', 'region_id' => '5'),
            array('id' => 195, 'code' => 'si', 'name' => 'Slovenia', 'region_id' => '3'),
            array('id' => 196, 'code' => 'sj', 'name' => 'Svalbard and Jan Mayen', 'region_id' => '3'),
            array('id' => 197, 'code' => 'sk', 'name' => 'Slovakia', 'region_id' => '3'),
            array('id' => 198, 'code' => 'sl', 'name' => 'Sierra Leone', 'region_id' => '5'),
            array('id' => 199, 'code' => 'sm', 'name' => 'San Marino', 'region_id' => '3'),
            array('id' => 200, 'code' => 'sn', 'name' => 'Senegal', 'region_id' => '5'),
            array('id' => 201, 'code' => 'so', 'name' => 'Somalia', 'region_id' => '5'),
            array('id' => 202, 'code' => 'sr', 'name' => 'Suriname', 'region_id' => '4'),
            array('id' => 203, 'code' => 'st', 'name' => 'Sao Tome and Principe', 'region_id' => '5'),
            array('id' => 204, 'code' => 'sv', 'name' => 'El Salvador', 'region_id' => '4'),
            array('id' => 205, 'code' => 'sy', 'name' => 'Syrian Arab Republic', 'region_id' => '5'),
            array('id' => 206, 'code' => 'sz', 'name' => 'Swaziland', 'region_id' => '5'),
            array('id' => 207, 'code' => 'tc', 'name' => 'Turks and Caicos Islands(UK)', 'region_id' => '4'),
            array('id' => 208, 'code' => 'td', 'name' => 'Chad', 'region_id' => '5'),
            array('id' => 209, 'code' => 'tg', 'name' => 'Togo', 'region_id' => '5'),
            array('id' => 210, 'code' => 'tj', 'name' => 'Tajikistan', 'region_id' => '5'),
            array('id' => 211, 'code' => 'tk', 'name' => 'Tokelau(NZ)', 'region_id' => '5'),
            array('id' => 212, 'code' => 'tm', 'name' => 'Turkmenistan', 'region_id' => '5'),
            array('id' => 213, 'code' => 'tn', 'name' => 'Tunisia', 'region_id' => '5'),
            array('id' => 214, 'code' => 'to', 'name' => 'Tonga', 'region_id' => '5'),
            array('id' => 215, 'code' => 'tr', 'name' => 'Turkey', 'region_id' => '3'),
            array('id' => 216, 'code' => 'tt', 'name' => 'Trinidad and Tobago', 'region_id' => '4'),
            array('id' => 217, 'code' => 'tv', 'name' => 'Tuvalu', 'region_id' => '5'),
            array('id' => 218, 'code' => 'tw', 'name' => 'Taiwan', 'region_id' => '6'),
            array('id' => 219, 'code' => 'tz', 'name' => 'Tanzania', 'region_id' => '5'),
            array('id' => 220, 'code' => 'ua', 'name' => 'Ukraine', 'region_id' => '3'),
            array('id' => 221, 'code' => 'ug', 'name' => 'Uganda', 'region_id' => '5'),
            array('id' => 222, 'code' => 'um', 'name' => 'United States Minor Outlying Islands', 'region_id' => '1'),
            array('id' => 223, 'code' => 'us', 'name' => 'United States', 'region_id' => '1'),
            array('id' => 225, 'code' => 'uy', 'name' => 'Uruguay', 'region_id' => '4'),
            array('id' => 226, 'code' => 'uz', 'name' => 'Uzbekistan', 'region_id' => '5'),
            array('id' => 227, 'code' => 'va', 'name' => 'Holy See (Vatican City State)', 'region_id' => '3'),
            array('id' => 228, 'code' => 'vc', 'name' => 'Saint Vincent and the Grenadines', 'region_id' => '4'),
            array('id' => 229, 'code' => 've', 'name' => 'Venezuela', 'region_id' => '4'),
            array('id' => 230, 'code' => 'vg', 'name' => 'Virgin Islands,  British', 'region_id' => '3'),
            array('id' => 231, 'code' => 'vi', 'name' => 'Virgin Islands,  U.S.', 'region_id' => '1'),
            array('id' => 232, 'code' => 'vn', 'name' => 'Viet Nam', 'region_id' => '5'),
            array('id' => 233, 'code' => 'vu', 'name' => 'Vanuatu', 'region_id' => '5'),
            array('id' => 234, 'code' => 'wf', 'name' => 'Wallis and Futuna(France)', 'region_id' => '5'),
            array('id' => 235, 'code' => 'ws', 'name' => 'Samoa', 'region_id' => '5'),
            array('id' => 236, 'code' => 'ye', 'name' => 'Yemen', 'region_id' => '5'),
            array('id' => 237, 'code' => 'yt', 'name' => 'Mayotte', 'region_id' => '5'),
            array('id' => 238, 'code' => 'za', 'name' => 'South Africa', 'region_id' => '5'),
            array('id' => 239, 'code' => 'zm', 'name' => 'Zambia', 'region_id' => '5'),
            array('id' => 240, 'code' => 'zw', 'name' => 'Zimbabwe', 'region_id' => '5'),
            array('id' => 241, 'code' => 'aq', 'name' => 'Antarctica', 'region_id' => '3'),
            array('id' => 242, 'code' => 'ax', 'name' => 'Åland Islands', 'region_id' => '3'),
            array('id' => 243, 'code' => 'bl', 'name' => 'Saint Barthélemy', 'region_id' => '3'),
            array('id' => 244, 'code' => 'cs', 'name' => 'Serbia and Montenegro', 'region_id' => '3'),
            array('id' => 246, 'code' => 'gg', 'name' => 'Guernsey', 'region_id' => '3'),
            array('id' => 247, 'code' => 'mf', 'name' => 'Saint Martin', 'region_id' => '3'),
            array('id' => 248, 'code' => 'mn', 'name' => 'Mongolia', 'region_id' => '5'),
            array('id' => 249, 'code' => 'ss', 'name' => 'South Sudan', 'region_id' => '5'),
            array('id' => 250, 'code' => 'sx', 'name' => 'Sint Maarten (Dutch part)', 'region_id' => '3'),
            array('id' => 251, 'code' => 'ta', 'name' => 'Tristan da Cunha', 'region_id' => '3'),
            array('id' => 252, 'code' => 'tf', 'name' => 'French Southern Territories', 'region_id' => '3'),
            array('id' => 253, 'code' => 'th', 'name' => 'Thailand', 'region_id' => '5'),
            array('id' => 254, 'code' => 'tl', 'name' => 'Timor-Leste', 'region_id' => '5'),
        );
        DB::table('nation_region')->insert($countries);
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

}