package com.example.demo.config;

import com.example.demo.model.Producto;
import com.example.demo.repository.ProductoRepository;

public final class ProductosIniciales {
    private ProductosIniciales() {}

    public static void cargarSiVacio(ProductoRepository productos) {
        if (productos.count() > 0) return;
        nuevo(productos, "GA001", "Guitarra Acústica Folk", "Guitarras Acústicas", "Yamaha", "F310", 8, 129990, "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes.", "/images/productos/guitarra-acustica-folk.png");
        nuevo(productos, "GA002", "Guitarra Acústica Dreadnought", "Guitarras Acústicas", "Fender", "CD-60S", 5, 189990, "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado.", "/images/productos/guitarra-acustica-dreadnought.jpg");
        nuevo(productos, "GA003", "Guitarra Acústica Clásica 4/4", "Guitarras Acústicas", "Yamaha", "C40", 10, 89990, "Nylon, tapa de abeto. Ideal para estudio y flamenco.", "/images/productos/guitarra-acustica-clasica-4-4.png");
        nuevo(productos, "GA004", "Guitarra Electroacústica", "Guitarras Acústicas", "Takamine", "GN20CE", 3, 349990, "Pickup integrado, afinador incorporado.", "/images/productos/guitarra-electroacustica.png");
        nuevo(productos, "GA005", "Guitarra 3/4 Niños", "Guitarras Acústicas", "Yamaha", "JR1", 6, 79990, "Tamaño reducido para niños de 6 a 10 años.", "/images/productos/guitarra-3-4-ninos.png");
        nuevo(productos, "GE001", "Guitarra Eléctrica Stratocaster", "Guitarras Eléctricas", "Squier", "Affinity Strat", 5, 249990, "Cuerpo de álamo, mástil de arce, pastillas SSS.", "/images/productos/guitarra-electrica-stratocaster.png");
        nuevo(productos, "GE002", "Guitarra Eléctrica Les Paul", "Guitarras Eléctricas", "Epiphone", "Les Paul Std", 4, 323990, "Cuerpo caoba, tapa arce, pastillas humbucker.", "/images/productos/guitarra-electrica-les-paul.jpg");
        nuevo(productos, "GE003", "Guitarra Eléctrica SG", "Guitarras Eléctricas", "Epiphone", "SG Standard", 3, 319990, "Cuerpo caoba, mástil caoba, 2 humbuckers.", "/images/productos/guitarra-electrica-sg.jpg");
        nuevo(productos, "GE004", "Guitarra Eléctrica Telecaster", "Guitarras Eléctricas", "Squier", "Affinity Tele", 4, 239990, "Cuerpo álamo, clavijero vintage, 2 pastillas single.", "/images/productos/guitarra-electrica-telecaster.png");
        nuevo(productos, "GE005", "Guitarra Eléctrica Semi-hollow", "Guitarras Eléctricas", "Epiphone", "ES-335", 2, 549990, "Semi-hueca, 2 humbuckers, ideal para jazz y blues.", "/images/productos/guitarra-electrica-semi-hollow.png");
        nuevo(productos, "BA001", "Bajo Eléctrico 4 Cuerdas", "Bajos Eléctricos", "Squier", "Affinity PJ", 5, 299990, "Pickup PJ, cuerpo álamo, mástil arce.", "/images/productos/bajo-electrico-4-cuerdas.png");
        nuevo(productos, "BA002", "Bajo Eléctrico Jazz Bass", "Bajos Eléctricos", "Fender", "Player Jazz", 2, 699990, "Alder body, 2 Alnico V Jazz single-coil.", "/images/productos/bajo-electrico-jazz-bass.png");
        nuevo(productos, "BA003", "Bajo Acústico 4 Cuerdas", "Bajos Acústicos", "Yamaha", "APX700II", 2, 423990, "Electroacústico, afinador incorporado.", "/images/productos/bajo-acustico-4-cuerdas.png");
        nuevo(productos, "BT001", "Batería Acústica 5 Piezas", "Baterías", "Pearl", "Roadshow", 2, 539990, "Incluye atriles, platillos y pedal de bombo.", "/images/productos/bateria-acustica-5-piezas.png");
        nuevo(productos, "BT002", "Batería Electrónica 8 pads", "Baterías", "Roland", "TD-02KV", 2, 799990, "Módulo TD-02, 8 pads de goma, pedal hi-hat.", "/images/productos/bateria-electronica-8-pads.png");
        nuevo(productos, "BT003", "Caja Snare 14\"", "Baterías", "Pearl", "STE1450", 4, 89990, "Acero, 14x5\", 10 tensores.", "/images/productos/caja-snare-14.png");
        nuevo(productos, "BT004", "Platillo Hi-Hat 14\"", "Baterías", "Zildjian", "A Series", 3, 149990, "Latón B20, sonido brillante y claro.", "/images/productos/platillo-hi-hat-14.jpg");
        nuevo(productos, "BT005", "Platillo Crash 16\"", "Baterías", "Zildjian", "A Series", 3, 129990, "Latón B20, ataque rápido.", "/images/productos/platillo-crash-16.png");
        nuevo(productos, "TC001", "Teclado Digital 61 teclas", "Teclados y Pianos", "Yamaha", "PSR-E373", 4, 249990, "61 teclas sensibles al tacto, 622 voces.", "/images/productos/teclado-digital-61-teclas.png");
        nuevo(productos, "TC002", "Piano Digital 88 teclas", "Teclados y Pianos", "Yamaha", "P-45", 2, 439990, "88 teclas pesadas, 10 voces, pedal sustain incluido.", "/images/productos/piano-digital-88-teclas.png");
        nuevo(productos, "TC003", "Sintetizador 43 teclas", "Teclados y Pianos", "Arturia", "MiniLab MKII", 5, 129990, "MIDI controller, 43 mini teclas.", "/images/productos/sintetizador-43-teclas.png");
        nuevo(productos, "TC004", "Teclado MIDI 88 teclas", "Teclados y Pianos", "M-Audio", "Hammer 88", 2, 539990, "88 teclas martillo, sin sonidos propios.", "/images/productos/teclado-midi-88-teclas.png");
        nuevo(productos, "AM001", "Amplificador Guitarra 15W", "Amplificadores", "Fender", "Frontman 15G", 5, 39990, "15W, distorsión incorporada, entrada auxiliar.", "/images/productos/amplificador-guitarra-15w.png");
        nuevo(productos, "AM002", "Amplificador Guitarra 40W", "Amplificadores", "Marshall", "MG40GFX", 3, 233990, "40W, 4 canales, efectos digitales integrados.", "/images/productos/amplificador-guitarra-40w.png");
        nuevo(productos, "AM003", "Amplificador Bajo 100W", "Amplificadores", "Hartke", "HD100", 2, 449990, "100W, tweeter integrado, ecualizador de 4 bandas.", "/images/productos/amplificador-bajo-100w.png");
        nuevo(productos, "AM004", "Amplificador Acústico 40W", "Amplificadores", "Fishman", "Loudbox Mini", 2, 439990, "40W, 2 canales, reverb y chorus incorporados.", "/images/productos/amplificador-acustico-40w.png");
        nuevo(productos, "MI001", "Micrófono Dinámico Cardioide", "Micrófonos", "Shure", "SM58", 8, 149990, "Estándar industria para voz en vivo.", "/images/productos/microfono-dinamico-cardioide.png");
        nuevo(productos, "MI002", "Micrófono Dinámico Instrumento", "Micrófonos", "Shure", "SM57", 6, 139990, "Ideal para captura de instrumentos y amplificadores.", "/images/productos/microfono-dinamico-instrumento.png");
        nuevo(productos, "MI003", "Micrófono Condensador", "Micrófonos", "Audio-Tech.", "AT2020", 4, 199990, "Cardioide, XLR, ideal para grabación en estudio.", "/images/productos/microfono-condensador.png");
        nuevo(productos, "MI004", "Micrófono USB de Condensador", "Micrófonos", "Blue", "Yeti", 5, 239990, "USB, 4 patrones polares, ideal para streaming y podcast.", "/images/productos/microfono-usb-de-condensador.png");
        nuevo(productos, "PE001", "Pedal Distorsión", "Pedales de Efectos", "Boss", "DS-1", 7, 79990, "Clásico pedal de distorsión, 3 controles.", "/images/productos/pedal-distorsion.png");
        nuevo(productos, "PE002", "Pedal Reverb", "Pedales de Efectos", "Boss", "RV-6", 4, 179990, "8 modos de reverb, control de shimmer.", "/images/productos/pedal-reverb.png");
        nuevo(productos, "PE003", "Pedal Multi-efectos", "Pedales de Efectos", "Boss", "ME-80", 2, 349990, "Diseño tipo pedalboard, 8 efectos simultáneos.", "/images/productos/pedal-multi-efectos.png");
        nuevo(productos, "PE004", "Pedal Tuner Cromático", "Pedales de Efectos", "Boss", "TU-3", 8, 89990, "Afinador cromático, indicador de tono.", "/images/productos/pedal-tuner-cromatico.png");
        nuevo(productos, "PE005", "Pedal Delay", "Pedales de Efectos", "MXR", "Carbon Copy", 4, 179990, "Delay analógico cálido, tiempo 600ms.", "/images/productos/pedal-delay.png");
        nuevo(productos, "PE006", "Pedal Overdrive", "Pedales de Efectos", "Ibanez", "TS9", 6, 99990, "Tube Screamer clásico, sonido suave y orgánico.", "/images/productos/pedal-overdrive.png");
        nuevo(productos, "AC001", "Cuerdas Guitarra Eléctrica 09-42", "Accesorios", "Ernie Ball", "Super Slinky", 25, 8990, "Juego 6 cuerdas, calibre ligero.", "/images/productos/cuerdas-guitarra-electrica-09-42.png");
        nuevo(productos, "AC002", "Cuerdas Guitarra Acústica 12-53", "Accesorios", "Ernie Ball", "Earthwood", 20, 10990, "Bronce fósforo, sonido cálido.", "/images/productos/cuerdas-guitarra-acustica-12-53.png");
        nuevo(productos, "AC003", "Cuerdas Bajo 45-105", "Accesorios", "Ernie Ball", "Regular Slinky", 12, 14990, "Cuerdas de níquel entorchado, set 4 cuerdas.", "/images/productos/cuerdas-bajo-45-105.png");
        nuevo(productos, "AC004", "Púas de Guitarra x10 (0.73mm)", "Accesorios", "Fender", "351", 50, 3990, "Celuloide, grosor medio.", "/images/productos/puas-de-guitarra-x10-0-73mm.png");
        nuevo(productos, "AC005", "Capotraste Guitarra", "Accesorios", "Dunlop", "Trigger", 15, 12990, "Capotraste de resorte, compatible 6 cuerdas.", "/images/productos/capotraste-guitarra.png");
        nuevo(productos, "AC006", "Afinador de Clip", "Accesorios", "Snark", "SN-5", 20, 8990, "Afinador cromático de clip, pantalla giratoria.", "/images/productos/afinador-de-clip.png");
        nuevo(productos, "AC007", "Cable Instrumento 3m", "Accesorios", "Monster", "S100-I-3", 15, 12990, "Cable trenzado, conectores dorados, 3 metros.", "/images/productos/cable-instrumento-3m.png");
        nuevo(productos, "AC008", "Cable Instrumento 6m", "Accesorios", "Monster", "S100-I-6", 10, 17990, "Cable trenzado, conectores dorados, 6 metros.", "/images/productos/cable-instrumento-6m.png");
        nuevo(productos, "AC009", "Soporte Guitarra de Piso", "Accesorios", "Hercules", "GS302B", 12, 22990, "Soporte plegable con enganche automático.", "/images/productos/soporte-guitarra-de-piso.png");
        nuevo(productos, "AC010", "Soporte Guitarra de Pared", "Accesorios", "Hercules", "WAH-202", 10, 18990, "Montaje a pared, enganche automático.", "/images/productos/soporte-guitarra-de-pared.png");
        nuevo(productos, "ES001", "Interfaz de Audio 2x2 USB", "Estudio y Grabación", "Focusrite", "Scarlett Solo", 4, 149990, "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz.", "/images/productos/interfaz-de-audio-2x2-usb.png");
        nuevo(productos, "ES002", "Auriculares de Estudio", "Estudio y Grabación", "Audio-Tech.", "ATH-M20x", 6, 79990, "Circumaurales, respuesta 15Hz-20kHz.", "/images/productos/auriculares-de-estudio.png");
        nuevo(productos, "ES003", "Auriculares de Estudio Pro", "Estudio y Grabación", "Audio-Tech.", "ATH-M50x", 4, 219990, "Referencia de industria, sonido neutro y detallado.", "/images/productos/auriculares-de-estudio-pro.png");
        nuevo(productos, "ES004", "Monitor de Estudio 5\"", "Estudio y Grabación", "Yamaha", "HS5", 2, 349990, "Altavoz activo, respuesta plana, ideal mezcla.", "/images/productos/monitor-de-estudio-5.png");
        nuevo(productos, "ES005", "Pop Filter para Micrófono", "Estudio y Grabación", "Sennheiser", "MZP 40", 8, 14990, "Doble malla, brazo flexible con clip.", "/images/productos/pop-filter-para-microfono.png");
    }

    private static void nuevo(ProductoRepository productos, String codigo, String nombre, String categoria, String marca, String modelo, int stock, int precio, String descripcion, String imagen) {
        Producto producto = new Producto();
        producto.setCodigo(codigo);
        producto.setNombre(nombre);
        producto.setCategoria(categoria);
        producto.setMarca(marca);
        producto.setModelo(modelo);
        producto.setStock(stock);
        producto.setPrecio(precio);
        producto.setDescripcion(descripcion);
        producto.setImagen(imagen);
        productos.save(producto);
    }
}
