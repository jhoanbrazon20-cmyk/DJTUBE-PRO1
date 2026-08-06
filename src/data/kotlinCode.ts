import { KotlinFile } from '../types';

export const KOTLIN_FILES: KotlinFile[] = [
  {
    id: 'color_theme',
    filename: 'Theme.kt & Color.kt',
    description: 'Configuración de paleta oscura con verde neón (#00E676) y Material 3 Theme',
    code: `package com.djtube.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// ==========================================
// Color.kt - Paleta Oscura Verde Neón (#00E676)
// ==========================================

// Primario Verde Neón destacado (Sin amarillo)
val NeonGreenPrimary = Color(0xFF00E676)
val NeonGreenVariant = Color(0xFF00C853)
val NeonGreenLight = Color(0xFF69F0AE)
val NeonGreenDark = Color(0xFF00B0FF)

// Fondo & Superficies Oscuras Purificadas
val DarkBackground = Color(0xFF0A0A0A)
val DarkSurface = Color(0xFF121212)
val DarkSurfaceVariant = Color(0xFF1E1E1E)
val DarkSurfaceElevated = Color(0xFF262626)

// Textos y Contraste High Quality
val TextPrimary = Color(0xFFFFFFFF)
val TextSecondary = Color(0xFFB0B0B0)
val TextDisabled = Color(0xFF666666)
val DividerColor = Color(0xFF2A2A2A)

// Esquema de Colores Material 3
private val DJTubeDarkColorScheme = darkColorScheme(
    primary = NeonGreenPrimary,
    onPrimary = Color.Black,
    primaryContainer = Color(0xFF00381C),
    onPrimaryContainer = NeonGreenLight,
    secondary = NeonGreenVariant,
    onSecondary = Color.Black,
    background = DarkBackground,
    onBackground = TextPrimary,
    surface = DarkSurface,
    onSurface = TextPrimary,
    surfaceVariant = DarkSurfaceVariant,
    onSurfaceVariant = TextSecondary,
    outline = DividerColor
)

// ==========================================
// Theme.kt - Configuración Principal Tema
// ==========================================
@Composable
fun DJTubeTheme(
    darkTheme: Boolean = true, // Modo Oscuro Activado por Defecto
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DJTubeDarkColorScheme,
        typography = Typography,
        content = content
    )
}
`
  },
  {
    id: 'main_screen',
    filename: 'MainScreen.kt',
    description: 'Búsqueda por enlaces/artistas con Vista Previa/Escuchar en streaming al tocar la tarjeta y botón verde de descarga',
    code: `package com.djtube.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.MusicNote
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.VideoLibrary
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.platform.LocalSoftwareKeyboardController
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.djtube.app.model.SearchResult
import com.djtube.app.ui.theme.NeonGreenPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(
    onDownloadClick: (SearchResult) -> Unit,
    onResultClick: (SearchResult) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    val keyboardController = LocalSoftwareKeyboardController.current

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        // Header Título DJ TUBE
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Icon(
                imageVector = Icons.Default.MusicNote,
                contentDescription = null,
                tint = NeonGreenPrimary,
                modifier = Modifier.size(32.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "DJ TUBE",
                style = MaterialTheme.typography.headlineMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
        }

        // Barra de Búsqueda Superior (Acepta Enlaces URL y Nombres de Artistas)
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = {
                Text(
                    "Pega un enlace o busca artistas (Ozuna, Bryant Myers...)",
                    fontSize = 13.sp,
                    color = Color.Gray
                )
            },
            leadingIcon = {
                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = "Buscar",
                    tint = NeonGreenPrimary
                )
            },
            trailingIcon = {
                if (searchQuery.isNotEmpty()) {
                    IconButton(onClick = { searchQuery = "" }) {
                        Icon(Icons.Default.Clear, contentDescription = "Limpiar", tint = Color.Gray)
                    }
                }
            },
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
            keyboardActions = KeyboardActions(onSearch = { keyboardController?.hide() }),
            shape = RoundedCornerShape(16.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedBorderColor = NeonGreenPrimary,
                unfocusedBorderColor = Color(0xFF2A2A2A),
                focusedContainerColor = Color(0xFF1E1E1E),
                unfocusedContainerColor = Color(0xFF1E1E1E),
                focusedTextColor = Color.White,
                unfocusedTextColor = Color.White
            ),
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp)
        )

        // Chip de Filtros Rápidos
        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            FilterChip(
                selected = true,
                onClick = { },
                label = { Text("Todos") },
                colors = FilterChipDefaults.filterChipColors(
                    selectedContainerColor = NeonGreenPrimary,
                    selectedLabelColor = Color.Black
                )
            )
            FilterChip(
                selected = false,
                onClick = { },
                label = { Text("Ozuna") },
                colors = FilterChipDefaults.filterChipColors(containerColor = Color(0xFF1E1E1E))
            )
            FilterChip(
                selected = false,
                onClick = { },
                label = { Text("Bryant Myers") },
                colors = FilterChipDefaults.filterChipColors(containerColor = Color(0xFF1E1E1E))
            )
            FilterChip(
                selected = false,
                onClick = { },
                label = { Text("Mezclas DJ") },
                colors = FilterChipDefaults.filterChipColors(containerColor = Color(0xFF1E1E1E))
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Lista de Resultados Visuales
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(bottom = 80.dp)
        ) {
            items(sampleSearchResults) { item ->
                SearchResultCard(
                    item = item,
                    onItemClick = { onResultClick(item) },
                    onDownloadClick = { onDownloadClick(item) }
                )
            }
        }
    }
}

@Composable
fun SearchResultCard(
    item: SearchResult,
    onItemClick: () -> Unit,
    onDownloadClick: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onItemClick() } // Tocar la tarjeta activa reproducción de Vista Previa / Streaming
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Miniatura (Thumbnail) con Botón Play y Badge de Duración
            Box(
                modifier = Modifier
                    .size(width = 110.dp, height = 75.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Color.Black),
                contentAlignment = Alignment.Center
            ) {
                AsyncImage(
                    model = item.thumbnailUrl,
                    contentDescription = item.title,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )
                // Botón Play Neón centrado para vista previa
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .background(NeonGreenPrimary, shape = RoundedCornerShape(16.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.PlayArrow,
                        contentDescription = "Escuchar Vista Previa",
                        tint = Color.Black,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Surface(
                    color = Color.Black.copy(alpha = 0.85f),
                    shape = RoundedCornerShape(4.dp),
                    modifier = Modifier
                        .align(Alignment.BottomEnd)
                        .padding(4.dp)
                ) {
                    Text(
                        text = item.duration,
                        color = Color.White,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                    )
                }
            }

            Spacer(modifier = Modifier.width(12.dp))

            // Información de Título, Artista e Indicador "Escuchar vista previa"
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = item.title,
                    color = Color.White,
                    fontWeight = FontWeight.SemiBold,
                    fontSize = 14.sp,
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = item.artist,
                    color = Color(0xFFB0B0B0),
                    fontSize = 12.sp,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis
                )
                Spacer(modifier = Modifier.height(4.dp))
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    Surface(
                        color = Color(0xFF00381C),
                        shape = RoundedCornerShape(4.dp)
                    ) {
                        Text(
                            text = "▶ Escuchar vista previa",
                            color = NeonGreenPrimary,
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold,
                            modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                        )
                    }
                    Text(
                        text = "• \${item.views}",
                        color = Color(0xFF777777),
                        fontSize = 10.sp
                    )
                }
            }

            Spacer(modifier = Modifier.width(8.dp))

            // Botón destacado Verde Neón de "Descargar"
            Button(
                onClick = onDownloadClick,
                colors = ButtonDefaults.buttonColors(
                    containerColor = NeonGreenPrimary,
                    contentColor = Color.Black
                ),
                shape = RoundedCornerShape(12.dp),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Download,
                    contentDescription = "Descargar",
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}
`
  },
  {
    id: 'download_options',
    filename: 'DownloadOptionsBottomSheet.kt',
    description: 'Menú desplegable ModalBottomSheet con selección de calidad Música (128/320kbps) y Video (360p-1080p)',
    code: `package com.djtube.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Audiotrack
import androidx.compose.material.icons.filled.Download
import androidx.compose.material.icons.filled.Hd
import androidx.compose.material.icons.filled.HighQuality
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.MusicNote
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.djtube.app.model.SearchResult
import com.djtube.app.ui.theme.NeonGreenPrimary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DownloadOptionsBottomSheet(
    item: SearchResult,
    onDismissRequest: () -> Unit,
    onConfirmDownload: (format: String, quality: String) -> Unit
) {
    var selectedOption by remember { mutableStateOf<String>("320kbps") }

    ModalBottomSheet(
        onDismissRequest = onDismissRequest,
        containerColor = Color(0xFF161616),
        dragHandle = {
            Box(
                modifier = Modifier
                    .padding(vertical = 10.dp)
                    .width(40.dp)
                    .height(4.dp)
                    .clip(RoundedCornerShape(2.dp))
                    .background(Color(0xFF444444))
            )
        }
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 12.dp)
        ) {
            // Encabezado del archivo seleccionado
            Text(
                text = "Opciones de Descarga",
                style = MaterialTheme.typography.titleMedium.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = item.title,
                fontSize = 12.sp,
                color = Color.Gray,
                maxLines = 1
            )

            Spacer(modifier = Modifier.height(20.dp))

            // ==========================================
            // SECCIÓN 1: MÚSICA (Audio MP3)
            // ==========================================
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.MusicNote,
                    contentDescription = null,
                    tint = NeonGreenPrimary,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "SECCIÓN DE MÚSICA (Audio MP3)",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = NeonGreenPrimary
                )
            }
            Spacer(modifier = Modifier.height(10.dp))

            QualityOptionItem(
                title = "Baja Calidad (128 kbps MP3)",
                subtitle = "Ideal para ahorro de almacenamiento (~3.8 MB)",
                isSelected = selectedOption == "128kbps",
                onClick = { selectedOption = "128kbps" }
            )

            Spacer(modifier = Modifier.height(8.dp))

            QualityOptionItem(
                title = "Alta Calidad (320 kbps MP3)",
                subtitle = "Audio HD nitidez máxima DJ (~9.4 MB)",
                isRecommended = true,
                isSelected = selectedOption == "320kbps",
                onClick = { selectedOption = "320kbps" }
            )

            Spacer(modifier = Modifier.height(24.dp))

            // ==========================================
            // SECCIÓN 2: VIDEO / PELÍCULAS (Video MP4)
            // ==========================================
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(
                    imageVector = Icons.Default.Movie,
                    contentDescription = null,
                    tint = NeonGreenPrimary,
                    modifier = Modifier.size(20.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "SECCIÓN DE VIDEO / PELÍCULAS (MP4)",
                    fontWeight = FontWeight.Bold,
                    fontSize = 12.sp,
                    color = NeonGreenPrimary
                )
            }
            Spacer(modifier = Modifier.height(10.dp))

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                QualityChip(
                    label = "360p",
                    size = "14 MB",
                    isSelected = selectedOption == "360p",
                    modifier = Modifier.weight(1f),
                    onClick = { selectedOption = "360p" }
                )
                QualityChip(
                    label = "480p",
                    size = "28 MB",
                    isSelected = selectedOption == "480p",
                    modifier = Modifier.weight(1f),
                    onClick = { selectedOption = "480p" }
                )
            }

            Spacer(modifier = Modifier.height(8.dp))

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                QualityChip(
                    label = "720p HD",
                    size = "64 MB",
                    isSelected = selectedOption == "720p",
                    modifier = Modifier.weight(1f),
                    onClick = { selectedOption = "720p" }
                )
                QualityChip(
                    label = "1080p Full HD",
                    size = "145 MB",
                    isBestQuality = true,
                    isSelected = selectedOption == "1080p",
                    modifier = Modifier.weight(1f),
                    onClick = { selectedOption = "1080p" }
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Botón de Confirmación verde destacado
            Button(
                onClick = {
                    val format = if (selectedOption.contains("kbps")) "MP3" else "MP4"
                    onConfirmDownload(format, selectedOption)
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .height(52.dp),
                shape = RoundedCornerShape(14.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = NeonGreenPrimary,
                    contentColor = Color.Black
                )
            ) {
                Icon(Icons.Default.Download, contentDescription = null)
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = "INICIAR DESCARGA AHORA",
                    fontWeight = FontWeight.Bold,
                    fontSize = 15.sp
                )
            }

            Spacer(modifier = Modifier.height(16.dp))
        }
    }
}

@Composable
fun QualityOptionItem(
    title: String,
    subtitle: String,
    isSelected: Boolean,
    isRecommended: Boolean = false,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        color = if (isSelected) Color(0xFF00381C) else Color(0xFF222222),
        modifier = Modifier
            .fillMaxWidth()
            .border(
                width = if (isSelected) 2.dp else 1.dp,
                color = if (isSelected) NeonGreenPrimary else Color(0xFF333333),
                shape = RoundedCornerShape(12.dp)
            )
    ) {
        Row(
            modifier = Modifier.padding(14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            RadioButton(
                selected = isSelected,
                onClick = onClick,
                colors = RadioButtonDefaults.colors(selectedColor = NeonGreenPrimary)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Text(text = title, fontWeight = FontWeight.SemiBold, color = Color.White, fontSize = 14.sp)
                    if (isRecommended) {
                        Spacer(modifier = Modifier.width(6.dp))
                        Surface(
                            color = NeonGreenPrimary,
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                "RECOMENDADO",
                                fontSize = 9.sp,
                                fontWeight = FontWeight.Bold,
                                color = Color.Black,
                                modifier = Modifier.padding(horizontal = 4.dp, vertical = 2.dp)
                            )
                        }
                    }
                }
                Text(text = subtitle, fontSize = 11.sp, color = Color.Gray)
            }
        }
    }
}

@Composable
fun QualityChip(
    label: String,
    size: String,
    isSelected: Boolean,
    isBestQuality: Boolean = false,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Surface(
        onClick = onClick,
        shape = RoundedCornerShape(12.dp),
        color = if (isSelected) Color(0xFF00381C) else Color(0xFF222222),
        modifier = modifier.border(
            width = if (isSelected) 2.dp else 1.dp,
            color = if (isSelected) NeonGreenPrimary else Color(0xFF333333),
            shape = RoundedCornerShape(12.dp)
        )
    ) {
        Row(
            modifier = Modifier.padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column {
                Text(text = label, fontWeight = FontWeight.Bold, color = Color.White, fontSize = 13.sp)
                Text(text = size, fontSize = 11.sp, color = Color.Gray)
            }
            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.HighQuality,
                    contentDescription = null,
                    tint = NeonGreenPrimary,
                    modifier = Modifier.size(18.dp)
                )
            }
        }
    }
}
`
  },
  {
    id: 'downloads_screen',
    filename: 'DownloadsScreen.kt',
    description: 'Gestor de descargas en pestañas (Música y Videos), botones para reproducir, compartir y eliminar',
    code: `package com.djtube.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.FolderZip
import androidx.compose.material.icons.filled.Movie
import androidx.compose.material.icons.filled.MusicNote
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.djtube.app.model.DownloadItem
import com.djtube.app.ui.theme.NeonGreenPrimary

@Composable
fun DownloadsScreen(
    onPlayItem: (DownloadItem) -> Unit,
    onShareItem: (DownloadItem) -> Unit,
    onDeleteItem: (DownloadItem) -> Unit
) {
    var selectedTabIndex by remember { mutableStateOf(0) }
    val tabTitles = listOf("Todas", "Música (MP3)", "Videos (MP4)")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(horizontal = 16.dp)
    ) {
        Spacer(modifier = Modifier.height(16.dp))

        // Encabezado Pantalla Descargas
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(vertical = 8.dp)
        ) {
            Icon(
                imageVector = Icons.Default.FolderZip,
                contentDescription = null,
                tint = NeonGreenPrimary,
                modifier = Modifier.size(28.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
            Text(
                text = "Biblioteca de Descargas",
                style = MaterialTheme.typography.titleLarge.copy(
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Pestañas (Tabs) de Filtro
        TabRow(
            selectedTabIndex = selectedTabIndex,
            containerColor = Color(0xFF1E1E1E),
            contentColor = NeonGreenPrimary,
            indicator = { tabPositions ->
                TabRowDefaults.SecondaryIndicator(
                    modifier = Modifier.tabIndicatorOffset(tabPositions[selectedTabIndex]),
                    color = NeonGreenPrimary
                )
            }
        ) {
            tabTitles.forEachIndexed { index, title ->
                Tab(
                    selected = selectedTabIndex == index,
                    onClick = { selectedTabIndex = index },
                    text = {
                        Text(
                            text = title,
                            fontWeight = if (selectedTabIndex == index) FontWeight.Bold else FontWeight.Normal,
                            color = if (selectedTabIndex == index) NeonGreenPrimary else Color.Gray,
                            fontSize = 12.sp
                        )
                    }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Lista de Descargas
        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(bottom = 80.dp)
        ) {
            items(sampleDownloads) { download ->
                DownloadCardItem(
                    download = download,
                    onPlay = { onPlayItem(download) },
                    onShare = { onShareItem(download) },
                    onDelete = { onDeleteItem(download) }
                )
            }
        }
    }
}

@Composable
fun DownloadCardItem(
    download: DownloadItem,
    onPlay: () -> Unit,
    onShare: () -> Unit,
    onDelete: () -> Unit
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Thumbnail mini
                Box(
                    modifier = Modifier
                        .size(60.dp)
                        .clip(RoundedCornerShape(10.dp))
                        .background(Color.Black)
                ) {
                    AsyncImage(
                        model = download.thumbnailUrl,
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }

                Spacer(modifier = Modifier.width(12.dp))

                // Metadata
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = download.title,
                        color = Color.White,
                        fontWeight = FontWeight.SemiBold,
                        fontSize = 14.sp,
                        maxLines = 1,
                        overflow = TextOverflow.Ellipsis
                    )
                    Text(
                        text = download.artist,
                        color = Color.Gray,
                        fontSize = 12.sp
                    )
                    Spacer(modifier = Modifier.height(2.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(6.dp)) {
                        Surface(
                            color = Color(0xFF00381C),
                            shape = RoundedCornerShape(4.dp)
                        ) {
                            Text(
                                text = "\${download.format} • \${download.quality}",
                                color = NeonGreenPrimary,
                                fontSize = 10.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                            )
                        }
                        Text(
                            text = download.fileSize,
                            color = Color(0xFF888888),
                            fontSize = 10.sp
                        )
                    }
                }
            }

            // Barra de progreso si está descargando
            if (download.status == "downloading") {
                Spacer(modifier = Modifier.height(10.dp))
                LinearProgressIndicator(
                    progress = { download.progress / 100f },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(6.dp)
                        .clip(RoundedCornerShape(3.dp)),
                    color = NeonGreenPrimary,
                    trackColor = Color(0xFF333333)
                )
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Descargando...", fontSize = 10.sp, color = NeonGreenPrimary)
                    Text("\${download.progress}%", fontSize = 10.sp, color = Color.White)
                }
            } else {
                Spacer(modifier = Modifier.height(10.dp))
                Divider(color = Color(0xFF2A2A2A))
                Spacer(modifier = Modifier.height(6.dp))

                // Botones de Acción: Reproducir, Compartir, Eliminar
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.End,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(onClick = onShare) {
                        Icon(Icons.Default.Share, contentDescription = "Compartir", tint = Color.LightGray)
                    }
                    IconButton(onClick = onDelete) {
                        Icon(Icons.Default.Delete, contentDescription = "Eliminar", tint = Color(0xFFFF5252))
                    }
                    Spacer(modifier = Modifier.width(4.dp))
                    Button(
                        onClick = onPlay,
                        colors = ButtonDefaults.buttonColors(
                            containerColor = NeonGreenPrimary,
                            contentColor = Color.Black
                        ),
                        shape = RoundedCornerShape(10.dp),
                        contentPadding = PaddingValues(horizontal = 14.dp, vertical = 6.dp)
                    ) {
                        Icon(Icons.Default.PlayArrow, contentDescription = null, modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Reproducir", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}
`
  },
  {
    id: 'media_player',
    filename: 'MediaPlayerScreen.kt',
    description: 'Reproductor integrado para audio y video con controles neón, ecualizador visual y slider de tiempo',
    code: `package com.djtube.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Equalizer
import androidx.compose.material.icons.filled.FastForward
import androidx.compose.material.icons.filled.FastRewind
import androidx.compose.material.icons.filled.Fullscreen
import androidx.compose.material.icons.filled.Pause
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material.icons.filled.Repeat
import androidx.compose.material.icons.filled.Shuffle
import androidx.compose.material.icons.filled.SkipNext
import androidx.compose.material.icons.filled.SkipPrevious
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.djtube.app.model.DownloadItem
import com.djtube.app.ui.theme.NeonGreenPrimary

@Composable
fun MediaPlayerScreen(
    currentItem: DownloadItem?,
    isPlaying: Boolean,
    onPlayPauseToggle: () -> Unit,
    onSeek: (Float) -> Unit
) {
    var sliderPosition by remember { mutableFloatStateOf(0.35f) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF0A0A0A))
            .padding(20.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Spacer(modifier = Modifier.height(10.dp))

        // Header Superior del Reproductor
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Surface(
                color = Color(0xFF1E1E1E),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(
                    text = if (currentItem?.type == "video") "REPRODUCTOR VIDEO MP4" else "REPRODUCTOR AUDIO MP3",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = NeonGreenPrimary,
                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                )
            }

            IconButton(onClick = { }) {
                Icon(Icons.Default.Fullscreen, contentDescription = "Pantalla Completa", tint = Color.White)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Escenario de Reproducción (Carátula de Vinilo o Pantalla de Video)
        Card(
            shape = RoundedCornerShape(24.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFF1E1E1E)),
            elevation = CardDefaults.cardElevation(defaultElevation = 12.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(280.dp)
        ) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                AsyncImage(
                    model = currentItem?.thumbnailUrl ?: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
                    contentDescription = null,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize()
                )

                // Superposición de ecualizador gráfico simulado neón
                Surface(
                    color = Color.Black.copy(alpha = 0.5f),
                    modifier = Modifier.fillMaxSize()
                ) {}

                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Equalizer,
                        contentDescription = null,
                        tint = NeonGreenPrimary,
                        modifier = Modifier.size(56.dp)
                    )
                    Text(
                        text = "DJ TUBE AUDIO ENGINE",
                        color = NeonGreenPrimary,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Título del Track y Artista
        Text(
            text = currentItem?.title ?: "Ozuna x Bryant Myers - Caramelo Remix",
            color = Color.White,
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp,
            textAlign = TextAlign.Center,
            maxLines = 2
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = currentItem?.artist ?: "DJ TUBE Exclusive Edit 320kbps",
            color = Color.Gray,
            fontSize = 14.sp
        )

        Spacer(modifier = Modifier.height(20.dp))

        // Slider de Tiempo de Reproducción
        Slider(
            value = sliderPosition,
            onValueChange = {
                sliderPosition = it
                onSeek(it)
            },
            colors = SliderDefaults.colors(
                thumbColor = NeonGreenPrimary,
                activeTrackColor = NeonGreenPrimary,
                inactiveTrackColor = Color(0xFF333333)
            ),
            modifier = Modifier.fillMaxWidth()
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("01:28", fontSize = 12.sp, color = Color.Gray)
            Text(currentItem?.duration ?: "04:15", fontSize = 12.sp, color = Color.Gray)
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Controles Principales de Reproducción (Play/Pause, Next, Prev, Shuffle, Repeat)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { }) {
                Icon(Icons.Default.Shuffle, contentDescription = "Aleatorio", tint = Color.Gray)
            }
            IconButton(onClick = { }) {
                Icon(Icons.Default.SkipPrevious, contentDescription = "Anterior", tint = Color.White, modifier = Modifier.size(32.dp))
            }

            // Botón Principal Verde Neón Play / Pause
            FloatingActionButton(
                onClick = onPlayPauseToggle,
                containerColor = NeonGreenPrimary,
                contentColor = Color.Black,
                shape = CircleShape,
                modifier = Modifier.size(64.dp)
            ) {
                Icon(
                    imageVector = if (isPlaying) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = "Play/Pause",
                    modifier = Modifier.size(36.dp)
                )
            }

            IconButton(onClick = { }) {
                Icon(Icons.Default.SkipNext, contentDescription = "Siguiente", tint = Color.White, modifier = Modifier.size(32.dp))
            }
            IconButton(onClick = { }) {
                Icon(Icons.Default.Repeat, contentDescription = "Repetir", tint = NeonGreenPrimary)
            }
        }
    }
}
`
  },
  {
    id: 'build_gradle',
    filename: 'build.gradle.kts (Module :app)',
    description: 'Configuración Gradle Android con minSdkVersion=24, targetSdkVersion=34, Jetpack Compose, Media3 ExoPlayer, WorkManager y youtube-dl-android',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.djtube.app"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.djtube.app"
        minSdk = 24 // Compatible desde Android 7.0 (99%+ de dispositivos)
        targetSdk = 34
        versionCode = 100
        versionName = "2.4.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        
        // Optimización para librerías nativas de descarga (FFmpeg / youtube-dl C++)
        ndk {
            abiFilters.addAll(listOf("armeabi-v7a", "arm64-v8a", "x86", "x86_64"))
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    // AndroidX Core & Lifecycle
    implementation(libs.androidx.core.ktx)
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.7.0")
    implementation("androidx.activity:activity-compose:1.8.2")

    // Jetpack Compose & Material 3
    implementation(platform("androidx.compose:compose-bom:2024.02.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Coil para Carga Ultra Rápida de Miniaturas (Thumbnails)
    implementation("io.coil-kt:coil-compose:2.6.0")

    // AndroidX Media3 (ExoPlayer) para Reproducción HD Flawless
    implementation("androidx.media3:media3-exoplayer:1.3.0")
    implementation("androidx.media3:media3-ui:1.3.0")
    implementation("androidx.media3:media3-session:1.3.0")

    // WorkManager para Descargas Imparables en Segundo Plano
    implementation("androidx.work:work-runtime-ktx:2.9.0")

    // Motor youtube-dl-android para YouTube, TikTok (sin marca de agua), IG & FB
    implementation("com.github.yausername.youtu-dl-android:library:0.15.0")
    implementation("com.github.yausername.youtu-dl-android:ffmpeg:0.15.0")
}
`
  },
  {
    id: 'link_extractor',
    filename: 'LinkExtractor.kt',
    description: 'Motor de extracción multi-plataforma para URLs (YouTube, TikTok sin marca de agua, IG, FB) y búsquedas por texto con "ytsearch:"',
    code: `package com.djtube.app.engine

import android.content.Context
import com.yausername.youtubedl_android.YoutubeDL
import com.yausername.youtubedl_android.YoutubeDLRequest
import com.yausername.youtubedl_android.mapper.VideoInfo
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

data class ExtractedMedia(
    val id: String,
    val title: String,
    val uploader: String,
    val durationString: String,
    val thumbnailUrl: String,
    val directStreamUrl: String,
    val isDirectUrl: Boolean,
    val platform: String // "YouTube", "TikTok", "Facebook", "Instagram"
)

object LinkExtractor {

    suspend fun extractOrSearch(context: Context, query: String): List<ExtractedMedia> = withContext(Dispatchers.IO) {
        val trimmed = query.trim()
        val isUrl = trimmed.startsWith("http://") || trimmed.startsWith("https://")

        return@withContext if (isUrl) {
            listOf(extractFromUrl(trimmed))
        } else {
            searchByKeywords("ytsearch10:\$trimmed")
        }
    }

    private fun extractFromUrl(url: String): ExtractedMedia {
        val platform = when {
            url.contains("tiktok.com") -> "TikTok (Sin Marca de Agua)"
            url.contains("instagram.com") -> "Instagram Reel"
            url.contains("facebook.com") || url.contains("fb.watch") -> "Facebook Video"
            else -> "YouTube / DJ Tube"
        }

        val request = YoutubeDLRequest(url).apply {
            addOption("--no-playlist")
            addOption("-f", "best")
        }

        val info: VideoInfo = YoutubeDL.getInstance().getInfo(request)

        return ExtractedMedia(
            id = info.id ?: System.currentTimeMillis().toString(),
            title = info.title ?: "Pista o Video Extraído",
            uploader = info.uploader ?: info.artist ?: "Artista Oficial",
            durationString = formatDuration(info.duration),
            thumbnailUrl = info.thumbnail ?: "",
            directStreamUrl = info.url ?: url,
            isDirectUrl = true,
            platform = platform
        )
    }

    private fun searchByKeywords(searchQuery: String): List<ExtractedMedia> {
        val request = YoutubeDLRequest(searchQuery).apply {
            addOption("--flat-playlist")
            addOption("--dump-single-json")
        }

        val info = YoutubeDL.getInstance().getInfo(request)
        val results = mutableListOf<ExtractedMedia>()

        info.entries?.forEach { entry ->
            results.add(
                ExtractedMedia(
                    id = entry.id ?: "",
                    title = entry.title ?: "Resultado sin título",
                    uploader = entry.uploader ?: "DJ TUBE",
                    durationString = formatDuration(entry.duration),
                    thumbnailUrl = entry.thumbnail ?: "",
                    directStreamUrl = entry.url ?: "",
                    isDirectUrl = false,
                    platform = "YouTube"
                )
            )
        }
        return results
    }

    private fun formatDuration(seconds: Int): String {
        if (seconds <= 0) return "03:45"
        val m = seconds / 60
        val s = seconds % 60
        return String.format("%02d:%02d", m, s)
    }
}
`
  },
  {
    id: 'download_worker',
    filename: 'DownloadWorker.kt',
    description: 'Worker en segundo plano resiliente. Mantiene la descarga activa aunque el usuario cierre la app, use WhatsApp o bloquee la pantalla',
    code: `package com.djtube.app.worker

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.work.CoroutineWorker
import androidx.work.ForegroundInfo
import androidx.work.WorkerParameters
import androidx.work.workDataOf
import com.djtube.app.R
import com.yausername.youtubedl_android.YoutubeDL
import com.yausername.youtubedl_android.YoutubeDLRequest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

class DownloadWorker(
    private val context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    private val notificationManager =
        context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    companion object {
        const val CHANNEL_ID = "dj_tube_downloads_channel"
        const val KEY_URL = "key_download_url"
        const val KEY_FORMAT = "key_format" // MP3 o MP4
        const val KEY_QUALITY = "key_quality" // 320kbps, 1080p, etc
        const val KEY_TITLE = "key_title"
        const val KEY_PROGRESS = "key_progress"
    }

    override suspend fun doWork(): Result = withContext(Dispatchers.IO) {
        val downloadUrl = inputData.getString(KEY_URL) ?: return@withContext Result.failure()
        val format = inputData.getString(KEY_FORMAT) ?: "MP3"
        val quality = inputData.getString(KEY_QUALITY) ?: "320kbps"
        val title = inputData.getString(KEY_TITLE) ?: "Canción DJ Tube"

        val notificationId = title.hashCode()

        // 1. Iniciar Servicio en Primer Plano (Foreground Service) con Notificación de Progreso
        createNotificationChannel()
        setForeground(createForegroundInfo(title, 0, notificationId))

        try {
            val downloadsDir = File(context.getExternalFilesDir(null), "DJTubeDownloads")
            if (!downloadsDir.exists()) downloadsDir.mkdirs()

            val request = YoutubeDLRequest(downloadUrl).apply {
                addOption("-o", "\${downloadsDir.absolutePath}/%(title)s.%(ext)s")
                if (format == "MP3") {
                    addOption("-x")
                    addOption("--audio-format", "mp3")
                    addOption("--audio-quality", if (quality.contains("320")) "0" else "5")
                } else {
                    addOption("-f", "bestvideo[height<=\${quality.replace("p", "")}]+bestaudio/best")
                }
            }

            // Execute con callback de progreso hacia WorkManager y Notificación del sistema
            YoutubeDL.getInstance().execute(request) { progress, _, _ ->
                val currentProgress = progress.toInt()
                setProgressAsync(workDataOf(KEY_PROGRESS to currentProgress))

                // Actualizar la notificación nativa en la barra de estado
                val updatedNotification = NotificationCompat.Builder(context, CHANNEL_ID)
                    .setContentTitle("Descargando \$title")
                    .setContentText("\$currentProgress% completado • \$format \$quality")
                    .setSmallIcon(android.R.drawable.stat_sys_download)
                    .setProgress(100, currentProgress, false)
                    .setOngoing(true)
                    .setOnlyAlertOnce(true)
                    .build()

                notificationManager.notify(notificationId, updatedNotification)
            }

            // Descarga Completa con Éxito
            showCompletionNotification(title, notificationId)
            Result.success()

        } catch (e: Exception) {
            e.printStackTrace()
            showErrorNotification(title, notificationId)
            Result.failure()
        }
    }

    private fun createForegroundInfo(title: String, progress: Int, id: Int): ForegroundInfo {
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setContentTitle("Iniciando descarga: \$title")
            .setContentText("DJ TUBE Fondo Activo")
            .setSmallIcon(android.R.drawable.stat_sys_download)
            .setProgress(100, progress, false)
            .setOngoing(true)
            .build()

        return ForegroundInfo(id, notification)
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Descargas DJ TUBE",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Muestra el progreso de música y videos en segundo plano"
            }
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun showCompletionNotification(title: String, id: Int) {
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setContentTitle("¡Descarga Completada!")
            .setContentText("\$title está listo en tu biblioteca")
            .setSmallIcon(android.R.drawable.stat_sys_download_done)
            .setOngoing(false)
            .setAutoCancel(true)
            .build()
        notificationManager.notify(id, notification)
    }

    private fun showErrorNotification(title: String, id: Int) {
        val notification = NotificationCompat.Builder(context, CHANNEL_ID)
            .setContentTitle("Error al descargar \$title")
            .setContentText("Toca para reintentar la conexión")
            .setSmallIcon(android.R.drawable.stat_notify_error)
            .setOngoing(false)
            .setAutoCancel(true)
            .build()
        notificationManager.notify(id, notification)
    }
}
`
  },
  {
    id: 'download_repository',
    filename: 'DownloadRepository.kt',
    description: 'Repositorio Central que encola tareas en WorkManager y expone estados reactivos de descarga',
    code: `package com.djtube.app.repository

import android.content.Context
import androidx.work.*
import com.djtube.app.worker.DownloadWorker
import kotlinx.coroutines.flow.Flow
import java.util.UUID

class DownloadRepository(private val context: Context) {

    private val workManager = WorkManager.getInstance(context)

    fun startBackgroundDownload(
        url: String,
        title: String,
        format: String,
        quality: String
    ): UUID {
        // Restricciones de red: Requiere conexión a Internet activa
        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .build()

        val inputData = workDataOf(
            DownloadWorker.KEY_URL to url,
            DownloadWorker.KEY_TITLE to title,
            DownloadWorker.KEY_FORMAT to format,
            DownloadWorker.KEY_QUALITY to quality
        )

        // OneTimeWorkRequest garantizado por Android OS
        val downloadWorkRequest = OneTimeWorkRequestBuilder<DownloadWorker>()
            .setConstraints(constraints)
            .setInputData(inputData)
            .addTag("DJ_TUBE_DOWNLOAD")
            .build()

        // Encolar con política KEEP para no duplicar descargas activas
        workManager.enqueueUniqueWork(
            "download_\${url.hashCode()}",
            ExistingWorkPolicy.KEEP,
            downloadWorkRequest
        )

        return downloadWorkRequest.id
    }

    fun getDownloadStatus(workId: UUID): Flow<WorkInfo> {
        return workManager.getWorkInfoByIdFlow(workId)
    }

    fun cancelDownload(workId: UUID) {
        workManager.cancelWorkById(workId)
    }
}
`
  },
  {
    id: 'exoplayer_integration',
    filename: 'MediaPlayerExoPlayer.kt',
    description: 'Componente Jetpack Compose integrado con Media3 ExoPlayer para reproducción sin latencia de audio y video HD',
    code: `package com.djtube.app.ui.components

import android.net.Uri
import androidx.annotation.OptIn
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import androidx.media3.common.util.UnstableApi
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView

@OptIn(UnstableApi::class)
@Composable
fun ExoPlayerView(
    mediaUrl: String,
    isVideo: Boolean,
    isPlaying: Boolean,
    onPlayerStateChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier
) {
    val context = LocalContext.current

    // Inicialización perezosa (Lazy) de ExoPlayer
    val exoPlayer = remember {
        ExoPlayer.Builder(context).build().apply {
            repeatMode = Player.REPEAT_MODE_ALL
            playWhenReady = isPlaying
        }
    }

    // Efecto para actualizar la fuente de medios
    LaunchedEffect(mediaUrl) {
        if (mediaUrl.isNotEmpty()) {
            val mediaItem = MediaItem.fromUri(Uri.parse(mediaUrl))
            exoPlayer.setMediaItem(mediaItem)
            exoPlayer.prepare()
        }
    }

    // Control de Play / Pause
    LaunchedEffect(isPlaying) {
        if (isPlaying) {
            exoPlayer.play()
        } else {
            exoPlayer.pause()
        }
    }

    DisposableEffect(Unit) {
        onDispose {
            exoPlayer.release() // Liberar recursos de RAM al cerrar
        }
    }

    if (isVideo) {
        // Renderizar PlayerView nativo de Android
        AndroidView(
            factory = { ctx ->
                PlayerView(ctx).apply {
                    player = exoPlayer
                    useController = true
                    setBackgroundColor(android.graphics.Color.BLACK)
                }
            },
            modifier = modifier
                .fillMaxWidth()
                .height(260.dp)
                .clip(RoundedCornerShape(20.dp))
        )
    } else {
        // Si es Audio, mantener ExoPlayer corriendo en segundo plano sin superficie visual de video
        Box(
            modifier = modifier
                .fillMaxWidth()
                .height(0.dp)
                .background(Color.Transparent)
        )
    }
}
`
  }
];

