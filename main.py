import json

from flask import Flask, request
from flask_cors import CORS
from google.cloud import bigquery

app = Flask(__name__)
CORS(app)


@app.route('/api/players/')
def get_players():
    print(request.args.get('version'))
    print(request.args.get('team'))

    return _get_bigquery_result("""
        SELECT DISTINCT id, name FROM `analysis.players` WHERE overall_rating >= 75
    """)


@app.route('/api/player/<player_id>')
def get_player_evolution(player_id):
    return _get_bigquery_result("""
        SELECT team_image_url, overall_rating, version_name, name FROM `analysis.players` WHERE id = {player_id} ORDER BY version_name
    """, player_id=player_id)


@app.route('/api/versions/')
def get_versions():
    return _get_bigquery_result(
        """SELECT DISTINCT version_name FROM `sofifa.versions`"""
    )


@app.route('/api/teams/')
@app.route('/api/potential-teams/')
def get_teams():
    return _get_bigquery_result(
        """SELECT DISTINCT team_name FROM `analysis.players`"""
    )


@app.route('/api/national-teams/')
def get_national_teams():
    return _get_bigquery_result(
        """SELECT DISTINCT country AS team_name FROM `analysis.players`"""
    )


@app.route('/api/player-positions/')
def get_player_positions():
    return _get_bigquery_result(
        """SELECT DISTINCT player_position FROM `analysis.players`"""
    )


@app.route('/api/comparasion/<fifa_version>/<position>/<field>')
def get_top_players_comparasion(fifa_version, position, field):
    return _get_bigquery_result("""
        SELECT 
            name, team_image_url, {field} AS field
        FROM `analysis.players` 
        WHERE player_position = '{player_position}' AND version_name = '{fifa_version}' 
        ORDER BY {field} DESC limit 3
    """, player_position=position, fifa_version=fifa_version.replace('FIFA ', ''), field=field)


@app.route('/api/comparasion/<fifa_version>/<attribute>')
def get_top_players_by_attribute(fifa_version, attribute):
    return _get_bigquery_result("""
        SELECT 
            name, team_image_url, {attribute} AS attribute
        FROM `analysis.players` 
        WHERE version_name = '{fifa_version}' 
        ORDER BY {attribute} DESC limit 10
    """, fifa_version=fifa_version.replace('FIFA ', ''), attribute=attribute)


@app.route('/api/best/teams/<team_name>/')
def get_best_starting_team(team_name):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            team_position AS player_position,
            version_name,
            image_url, 
            overall_rating,
            team_image_url 
        FROM `analysis.best_starting_team` 
        WHERE team_name = '{team_name}' 
        ORDER BY position_order
    """, team_name=team_name)


@app.route('/api/combined-teams/<team_1>/<team_2>/')
def get_best_combined_starting_team(team_1, team_2):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            team_position AS player_position,
            version_name,
            team_image_url AS image_url, 
            overall_rating,
            team_image_url 
        FROM `analysis.best_starting_team` 
        WHERE team_name IN ('{team_1}' , '{team_2}' )
        ORDER BY position_order
    """, team_1=team_1, team_2=team_2)


@app.route('/api/worst/teams/<team_name>/')
def get_worst_starting_team(team_name):
    return _get_bigquery_result("""
        SELECT
            CONCAT(id, version_name) AS id, 
            name,
            team_position AS player_position,
            version_name,
            image_url, 
            overall_rating,
            team_image_url 
        FROM `analysis.worst_starting_team` 
        WHERE team_name = '{team_name}' 
        ORDER BY position_order
    """, team_name=team_name)


@app.route('/api/best/national-teams/<country_name>/')
def get_national_team(country_name):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            player_position,
            version_name,
            image_url, 
            overall_rating,
            country_image_url AS team_image_url 
        FROM `analysis.best_national_team` 
        WHERE country = '{country_name}' 
        ORDER BY position_order
    """, country_name=country_name)


@app.route('/api/best/potential-teams/<team_name>/')
def get_potential_team(team_name):
    return _get_bigquery_result("""
        SELECT 
            player_position,
            name, 
            potential_overall_rating AS overall_rating,
            version_name,
            age,
            image_url,
            team_image_url
        FROM `analysis.players` players 
        LEFT JOIN `analysis.positions` position 
        ON position.position = players.player_position 
        WHERE team_name = '{team_name}' 
        AND age <= 24 
        AND version_name = '20' 
        ORDER BY position.position_order 
    """, team_name=team_name)


@app.route('/api/position-evoloution/<position>')
def get_position_evolution(position):
    return _get_bigquery_result("""
        SELECT 
            * 
        FROM `analysis.best_players_by_position_and_version` 
        WHERE player_position = '{position}' 
        ORDER BY version_name 
    """, position=position)


@app.route('/api/version-team/<version_name>/')
def get_version_team(version_name):
    return _get_bigquery_result("""
        SELECT 
            CONCAT(id, version_name) AS id,
            name,
            team_position AS player_position,
            version_name,
            team_image_url AS image_url, 
            overall_rating,
            team_image_url  
        FROM `analysis.best_starting_team_from_version` 
        WHERE version_name = '{version_name}' 
        ORDER BY position_order 
    """, version_name=version_name.replace('FIFA ', ''))


def _get_bigquery_result(query, **kwargs):
    client = bigquery.Client()
    formated_query = query.format(**kwargs) if kwargs else query
    query_job = client.query(formated_query)
    rows = query_job.result()
    return {'result': [dict(row) for row in rows]}
