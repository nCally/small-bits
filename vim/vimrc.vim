" Just for note
" - the default <leader> key for my setup is Backslash \
"mappings

inoremap jk <ESC>
 " nnoremap ss :NERDTreeToggle<CR>
:autocmd InsertEnter * set cul
:autocmd InsertLeave * set nocul
" let NERDTreeShowHidden=1
let g:NERDTreeHijackNetrw=0 "makes plugin to show when 'vim .' command but this command turns it off

"remaping for fzf files plugin. so \f
noremap <leader>f :Files<CR>

"remaping for git tracked fzf files plugin. \gf
noremap <leader>gf :GFiles<CR>

"remaping for fzf files plugin. \b
noremap <leader>b :Buffers<CR>

"remaping for ALENext
nmap ]a :ALENextWrap<CR> 
nmap [a :ALEPreviousWrap<CR> 

syntax on

"settings

set number
set relativenumber
set tabstop=2
set shiftwidth=2
set softtabstop=2
set smarttab
set autoindent
set encoding=utf-8
set mouse=a


call plug#begin('~/.vim/plugged')

Plug 'dense-analysis/ale'

" file search
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

" This uses silver_searcher with ack. apt-get install silversearcher-ag 
Plug 'mileszs/ack.vim'

" commenting
Plug 'tpope/vim-commentary'

" themes
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'sainnhe/everforest'
Plug 'morhetz/gruvbox'
Plug 'sonph/onehalf'

Plug 'ap/vim-css-color'

" code formatting
Plug 'leafgarland/typescript-vim'
Plug 'peitalin/vim-jsx-typescript'
Plug 'maxmellon/vim-jsx-pretty'

" git
Plug 'tpope/vim-fugitive'
Plug 'airblade/vim-gitgutter'

Plug 'neoclide/coc.nvim', {'branch': 'release'}
let g:coc_global_extensions = [
  \ 'coc-tsserver'
  \ ]

call plug#end()

set background=dark

colorscheme gruvbox
let g:airline_theme='gruvbox'

" colorscheme everforest
" let g:airline_theme='everforest'

" colorscheme onehalflight
" let g:airline_theme='onehalflight'

let g:airline#extensions#ale#enabled = 1

let g:ale_fixers = {
\	'javascript': ['prettier', 'eslint'],
\	'typescript': ['prettier', 'eslint'],
\	'css': ['prettier'],
\}
let g:ale_linters_explicit=1
let g:ale_linters = {}
let g:ale_linters.typescript = ['eslint', 'tsserver', 'prettier']
let g:ale_lint_on_save=1
let g:ale_fix_on_save=1

let g:ackprg = 'ag --nogroup --nocolor --column'


"let g:neoformat_try_node_exe=1
"autocmd BufWritePre *.js,*.ts,*.jsx,*.tsx,*.css Neoformat
