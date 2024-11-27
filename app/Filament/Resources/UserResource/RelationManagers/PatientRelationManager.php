<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;

class PatientRelationManager extends RelationManager
{
    protected static string $relationship = 'patient';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('patient')
                    ->required()
                    ->maxLength(255),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('patient')
            ->columns([
                Tables\Columns\TextColumn::make('company')->formatStateUsing(static fn ($state) => $state->company_name),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                /*Tables\Actions\CreateAction::make(),*/
            ])
            ->actions([
                /*Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),*/
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    /*Tables\Actions\DeleteBulkAction::make(),*/
                ]),
            ]);
    }

    public static function getTitle(Model $ownerRecord, string $pageClass): string
    {
        return 'Patient Of';
    }
}
